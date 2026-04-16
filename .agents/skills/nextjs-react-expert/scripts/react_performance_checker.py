#!/usr/bin/env python3
"""
React Performance Checker
Automated performance audit for React/Next.js projects
Based on Vercel Engineering best practices (62 rules, v1.0.0)
"""

import os
import re
import json
import itertools
from pathlib import Path
from typing import List, Dict, Tuple


# Python's rglob does NOT support brace expansion {ts,tsx}.
# Use this helper to iterate over multiple extensions.
SOURCE_EXTS = ('*.ts', '*.tsx', '*.js', '*.jsx')
TS_EXTS = ('*.ts', '*.tsx')
TSX_EXTS = ('*.tsx',)


def rglob_multi(base: Path, patterns: tuple) -> list:
    """rglob with multiple patterns, deduplicated, node_modules excluded."""
    seen = set()
    results = []
    for pat in patterns:
        for fp in base.rglob(pat):
            if fp not in seen and 'node_modules' not in str(fp) and '.next' not in str(fp):
                seen.add(fp)
                results.append(fp)
    return results


class PerformanceChecker:
    def __init__(self, project_path: str):
        self.project_path = Path(project_path)
        self.issues = []
        self.warnings = []
        self.passed = []

    def check_waterfalls(self):
        """Check for sequential await patterns (Section 1)"""
        print("\n[*] Checking for waterfalls (sequential awaits)...")

        for filepath in rglob_multi(self.project_path, SOURCE_EXTS):
            try:
                content = filepath.read_text(encoding='utf-8')

                # Pattern: multiple awaits in sequence without Promise.all
                sequential_awaits = re.findall(r'await\s+\w+.*?\n\s*(?:const\s+\w+\s*=\s*)?await\s+\w+', content)

                if sequential_awaits:
                    # Check if they're inside a Promise.all — if so, skip
                    if 'Promise.all' not in content:
                        self.issues.append({
                            'file': str(filepath.relative_to(self.project_path)),
                            'type': 'CRITICAL',
                            'issue': f'Sequential awaits detected ({len(sequential_awaits)} potential waterfalls)',
                            'fix': 'Use Promise.all() for independent parallel fetching',
                            'section': '1-async-eliminating-waterfalls.md'
                        })
            except Exception:
                continue

    def check_barrel_imports(self):
        """Check for barrel imports (Section 2)"""
        print("[*] Checking for barrel imports...")

        for filepath in rglob_multi(self.project_path, SOURCE_EXTS):
            try:
                content = filepath.read_text(encoding='utf-8')

                # Pattern: import from index files or barrel exports
                barrel_imports = re.findall(r"import.*from\s+['\"](@/.*?)/index['\"]", content)

                if barrel_imports:
                    self.warnings.append({
                        'file': str(filepath.relative_to(self.project_path)),
                        'type': 'CRITICAL',
                        'issue': f'Barrel imports detected: {barrel_imports[:3]}',
                        'fix': 'Import directly from specific files',
                        'section': '2-bundle-bundle-size-optimization.md'
                    })
            except Exception:
                continue

    def check_dynamic_imports(self):
        """Check if large components use dynamic imports (Section 2)"""
        print("[*] Checking for missing dynamic imports...")

        for filepath in rglob_multi(self.project_path, TS_EXTS):
            try:
                content = filepath.read_text(encoding='utf-8')

                # Check file size - if > 10KB, should probably use dynamic import
                if len(content) > 10000:
                    filename = filepath.stem

                    # Search for static imports of this component
                    for check_file in rglob_multi(self.project_path, TS_EXTS):
                        if check_file == filepath:
                            continue

                        check_content = check_file.read_text(encoding='utf-8')
                        if f"import {filename}" in check_content or f"import {{ {filename}" in check_content:
                            if 'dynamic(' not in check_content:
                                self.warnings.append({
                                    'file': str(check_file.relative_to(self.project_path)),
                                    'type': 'CRITICAL',
                                    'issue': f'Large component {filename} ({len(content)//1024}KB) imported statically',
                                    'fix': 'Use dynamic() for code splitting',
                                    'section': '2-bundle-bundle-size-optimization.md'
                                })
                                break
            except Exception:
                continue

    def check_useEffect_fetching(self):
        """Check for data fetching in useEffect (Section 4)"""
        print("[*] Checking for useEffect data fetching...")

        for filepath in rglob_multi(self.project_path, TS_EXTS):
            try:
                content = filepath.read_text(encoding='utf-8')

                # Pattern: fetch or axios in useEffect
                if 'useEffect' in content:
                    if re.search(r'useEffect.*?fetch\(', content, re.DOTALL):
                        self.warnings.append({
                            'file': str(filepath.relative_to(self.project_path)),
                            'type': 'MEDIUM-HIGH',
                            'issue': 'Data fetching in useEffect',
                            'fix': 'Consider using SWR or React Query for deduplication',
                            'section': '4-client-client-side-data-fetching.md'
                        })
            except Exception:
                continue

    def check_missing_memoization(self):
        """Check for missing React.memo, useMemo, useCallback (Section 5)"""
        print("[*] Checking for missing memoization...")

        for filepath in rglob_multi(self.project_path, TSX_EXTS):
            try:
                content = filepath.read_text(encoding='utf-8')

                # Check for component definitions without memo
                components = re.findall(r'(?:export\s+)?(?:const|function)\s+([A-Z]\w+)', content)

                if components and 'React.memo' not in content and 'memo(' not in content:
                    # Check if component receives props
                    if 'props:' in content or 'Props>' in content:
                        self.warnings.append({
                            'file': str(filepath.relative_to(self.project_path)),
                            'type': 'MEDIUM',
                            'issue': f'Components with props not memoized: {components[:3]}',
                            'fix': 'Consider using React.memo if props are stable',
                            'section': '5-rerender-re-render-optimization.md'
                        })
            except Exception:
                continue

    def check_image_optimization(self):
        """Check for unoptimized images (Section 6)"""
        print("[*] Checking for image optimization...")

        for filepath in rglob_multi(self.project_path, SOURCE_EXTS):
            try:
                content = filepath.read_text(encoding='utf-8')

                # Check for <img> tags instead of next/image
                img_count = len(re.findall(r'<img\s', content))
                if img_count > 0 and 'next/image' not in content:
                    self.warnings.append({
                        'file': str(filepath.relative_to(self.project_path)),
                        'type': 'MEDIUM',
                        'issue': f'Using <img> ({img_count}x) instead of next/image',
                        'fix': 'Use next/image for automatic optimization',
                        'section': '6-rendering-rendering-performance.md'
                    })
            except Exception:
                continue

    def check_use_client_overuse(self):
        """Check for excessive 'use client' directives (Server Components underuse)"""
        print("[*] Checking for 'use client' overuse...")

        client_files = 0
        server_files = 0

        for filepath in rglob_multi(self.project_path, TSX_EXTS):
            try:
                content = filepath.read_text(encoding='utf-8')
                if "'use client'" in content or '"use client"' in content:
                    client_files += 1
                else:
                    server_files += 1
            except Exception:
                continue

        total = client_files + server_files
        if total > 0:
            ratio = client_files / total
            if ratio > 0.8:
                self.warnings.append({
                    'file': f'Project-wide ({client_files}/{total} = {ratio:.0%})',
                    'type': 'HIGH',
                    'issue': f'Most TSX files are client components ({client_files}/{total})',
                    'fix': 'Consider converting data-display components to Server Components',
                    'section': '3-server-server-side-performance.md'
                })
            else:
                self.passed.append(f"Server/Client ratio: {server_files} server / {client_files} client ({ratio:.0%} client)")

    def check_console_logs(self):
        """Check for console.log in production code"""
        print("[*] Checking for console.log statements...")

        for filepath in rglob_multi(self.project_path, SOURCE_EXTS):
            try:
                content = filepath.read_text(encoding='utf-8')
                console_matches = re.findall(r'console\.(log|debug|info)\(', content)
                if console_matches:
                    self.warnings.append({
                        'file': str(filepath.relative_to(self.project_path)),
                        'type': 'LOW',
                        'issue': f'console.{console_matches[0]}() found ({len(console_matches)}x)',
                        'fix': 'Remove or replace with structured logging (Winston, Pino)',
                        'section': 'general'
                    })
            except Exception:
                continue

    def generate_report(self):
        """Generate final report"""
        print("\n" + "="*60)
        print("REACT PERFORMANCE AUDIT REPORT")
        print("="*60)

        print(f"\n[CRITICAL ISSUES] ({len([i for i in self.issues if i['type'] == 'CRITICAL'])})")
        for issue in self.issues:
            if issue['type'] == 'CRITICAL':
                print(f"  ❌ {issue['file']}")
                print(f"     Issue: {issue['issue']}")
                print(f"     Fix: {issue['fix']}")
                print(f"     Ref: {issue['section']}\n")

        print(f"\n[WARNINGS] ({len(self.warnings)})")
        for warning in self.warnings[:15]:  # Show first 15
            icon = '🔴' if warning['type'] == 'CRITICAL' else '🟠' if warning['type'] == 'HIGH' else '🟡' if 'MEDIUM' in warning['type'] else '⚪'
            print(f"  {icon} [{warning['type']}] {warning['file']}")
            print(f"     Issue: {warning['issue']}")
            print(f"     Fix: {warning['fix']}")
            print(f"     Ref: {warning['section']}\n")

        if len(self.warnings) > 15:
            print(f"  ... and {len(self.warnings) - 15} more warnings")

        if self.passed:
            print(f"\n[PASSED] ({len(self.passed)})")
            for p in self.passed:
                print(f"  ✅ {p}")

        print("\n" + "="*60)
        print(f"SUMMARY:")
        print(f"  Critical Issues: {len([i for i in self.issues if i['type'] == 'CRITICAL'])}")
        print(f"  Warnings: {len(self.warnings)}")
        print(f"  Passed: {len(self.passed)}")
        print("="*60)

        if len(self.issues) == 0 and len(self.warnings) == 0:
            print("\n✅ No major performance issues detected!")
        else:
            print("\n⚠️  Review and fix issues above")
            print("Priority: CRITICAL > HIGH > MEDIUM > LOW")

    def run(self):
        """Run all checks"""
        print("="*60)
        print("React Performance Checker (Vercel Engineering v1.0)")
        print("="*60)
        print(f"Scanning: {self.project_path}")

        self.check_waterfalls()
        self.check_barrel_imports()
        self.check_dynamic_imports()
        self.check_useEffect_fetching()
        self.check_missing_memoization()
        self.check_image_optimization()
        self.check_use_client_overuse()
        self.check_console_logs()

        self.generate_report()


def main():
    import sys

    if len(sys.argv) < 2:
        print("Usage: python react_performance_checker.py <project_path>")
        sys.exit(1)

    project_path = sys.argv[1]

    if not os.path.exists(project_path):
        print(f"[ERROR] Path not found: {project_path}")
        sys.exit(1)

    checker = PerformanceChecker(project_path)
    checker.run()


if __name__ == '__main__':
    main()
