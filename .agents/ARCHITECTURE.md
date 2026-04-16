# HRTOOL - Agent System Architecture

> AI Agent Capability Expansion Toolkit for HRTOOL

---

## 📋 Overview

This agent system provides modular AI capabilities for the HRTOOL project:

- **20 Specialist Agents** - Role-based AI personas
- **48 Skills** - Domain-specific knowledge modules  
- **2 Workflows** - Slash command procedures
- **2 MCP Servers** - External tool integrations

---

## 🏗️ Directory Structure

```plaintext
HRTOOL/
├── AGENTS.md                    # Root rules (IDE auto-discovers this)
├── .agents/
│   ├── ARCHITECTURE.md          # This file
│   ├── mcp_config.json          # MCP server configuration
│   ├── agents/                  # 20 Specialist Agents
│   ├── skills/                  # 48 Skills
│   └── workflows/               # 2 Slash Commands
└── .docs/                       # Project documentation
    ├── author/                  # User preferences
    ├── domains/                 # Business domain knowledge
    └── tasks/                   # Task tracking
```

---

## 🤖 Agents (20)

Specialist AI personas for different domains.

### Core Development
| Agent | File | Focus |
|-------|------|-------|
| `frontend-specialist` | `frontend-specialist.md` | Web UI/UX, React, CSS |
| `backend-specialist` | `backend-specialist.md` | API, business logic |
| `mobile-developer` | `mobile-developer.md` | Mobile apps, React Native |
| `game-developer` | `game-developer.md` | Game development |

### Architecture & Planning
| Agent | File | Focus |
|-------|------|-------|
| `orchestrator` | `orchestrator.md` | Multi-agent coordination |
| `project-planner` | `project-planner.md` | Planning, architecture |
| `product-manager` | `product-manager.md` | Product strategy |
| `product-owner` | `product-owner.md` | Requirements, backlog |

### Quality & Security
| Agent | File | Focus |
|-------|------|-------|
| `qa-automation-engineer` | `qa-automation-engineer.md` | E2E testing, CI |
| `test-engineer` | `test-engineer.md` | Unit/integration tests |
| `security-auditor` | `security-auditor.md` | Security review |
| `penetration-tester` | `penetration-tester.md` | Vulnerability testing |
| `debugger` | `debugger.md` | Bug diagnosis |

### Operations & Docs
| Agent | File | Focus |
|-------|------|-------|
| `devops-engineer` | `devops-engineer.md` | CI/CD, infrastructure |
| `database-architect` | `database-architect.md` | Schema design, optimization |
| `performance-optimizer` | `performance-optimizer.md` | Performance tuning |
| `documentation-writer` | `documentation-writer.md` | Technical writing |
| `seo-specialist` | `seo-specialist.md` | SEO optimization |
| `code-archaeologist` | `code-archaeologist.md` | Legacy code analysis |
| `explorer-agent` | `explorer-agent.md` | Codebase exploration |

---

## 🧩 Skills (48)

Modular knowledge domains loaded on-demand. Each skill is a folder containing `SKILL.md`.

### Frontend & UI (8)
| Skill | Description |
|-------|-------------|
| `frontend-design` | UI/UX patterns, design systems |
| `tailwind-patterns` | Tailwind CSS v4 patterns |
| `react-components` | Stitch → Vite/React components |
| `shadcn-ui` | shadcn/ui integration |
| `web-design-guidelines` | Web UI audit & accessibility |
| `pwa-manifest-generator` | PWA manifest generation |
| `color-font-database` | 80+ palettes & 22 font pairings |
| `mobile-ux` | Mobile UX guidelines |

### Frameworks & Build Tools (6)
| Skill | Description |
|-------|-------------|
| `nextjs-react-expert` | React & Next.js optimization |
| `vite` | Vite build tool configuration |
| `vite-to-nextjs` | Migration guide Vite → Next.js |
| `composition-patterns` | React composition & compound components |
| `react-native-skills` | React Native & Expo best practices |
| `remotion` | Video generation with Remotion |

### Backend & Database (3)
| Skill | Description |
|-------|-------------|
| `postgres-patterns` | PostgreSQL query optimization |
| `supabase-postgres-best-practices` | Supabase/Postgres best practices |
| `rust-pro` | Rust async patterns & systems programming |

### SEO & Content (4)
| Skill | Description |
|-------|-------------|
| `aeo` | Answer Engine Optimization |
| `aeo-audit` | AEO readiness audit |
| `seo-content-optimizer` | SEO content analysis |
| `nextjs-sitemap` | XML sitemap generation |

### Browser & Automation (4)
| Skill | Description |
|-------|-------------|
| `agent-browser` | Browser automation CLI |
| `playwright-cli` | Playwright browser testing |
| `browser-vps-setup-skill` | Remote Chrome on VPS |
| `optimize-lighthouse` | Lighthouse score optimization |

### DevOps & Infrastructure (3)
| Skill | Description |
|-------|-------------|
| `deploy-to-vercel` | Vercel deployment |
| `inet-vps-connect` | INET VPS connection |
| `vps-checkup` | VPS health/security check |

### Document & Media (5)
| Skill | Description |
|-------|-------------|
| `pdf` | PDF manipulation |
| `pdf-to-docx` | PDF → Word conversion |
| `docx` | Word document creation/editing |
| `spreadsheet` | Excel/CSV manipulation |
| `creative-assets` | Banner, logo, slide design |

### AI & Design Tools (6)
| Skill | Description |
|-------|-------------|
| `design-md` | Design system synthesis |
| `stitch-loop` | Iterative website building |
| `enhance-prompt` | UI prompt enhancement |
| `web-artifacts-builder` | Multi-component UI artifacts |
| `brand-identity` | Brand voice & visual identity |
| `brainstorming` | Feature exploration & ideation |

### Domain-Specific (6)
| Skill | Description |
|-------|-------------|
| `happybook-cms` | Happybook Travel CMS automation |
| `auto-fill-hotel-skill` | Hotel product automation |
| `cms-tour-mapping` | Tour data import |
| `face-comparison-faceapi` | Face comparison (KYC) |
| `kyc-upload-nextjs` | KYC upload flow |
| `mrz-ocr-passport` | Passport MRZ parsing |

### Utility (3)
| Skill | Description |
|-------|-------------|
| `app-builder` | Full-stack app orchestrator |
| `google-drive` | Google Drive API integration |
| `skill-creator` | Create/modify skills |

---

## 🔄 Workflows (2)

Invoke with `/command` in chat.

| Command | Description |
|---------|-------------|
| `/deploy` | Deploy to VPS INET |
| `/orchestrate` | Multi-agent coordination |

---

## 🔌 MCP Servers (2)

External tool integrations via Model Context Protocol.

| Server | Type | Description |
|--------|------|-------------|
| `StitchMCP` | Remote (npx) | Google Stitch design API |
| `notebooklm-mcp-server` | Local (python) | NotebookLM integration |

---

## 🎯 Skill Loading Protocol

```plaintext
User Request → Match Skill Description → Load SKILL.md
                                              ↓
                                      Read scripts/ & references/
```

### Skill Folder Structure
```plaintext
skill-name/
├── SKILL.md           # (Required) Metadata & instructions
├── scripts/           # (Optional) Automation scripts
├── references/        # (Optional) Templates, docs
└── assets/            # (Optional) Images, resources
```

---

## 📊 Statistics

| Metric | Value |
|--------|-------|
| **Total Agents** | 20 |
| **Total Skills** | 48 |
| **Total Workflows** | 2 |
| **Total MCP Servers** | 2 |
