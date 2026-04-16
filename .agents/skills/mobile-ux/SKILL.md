---
name: mobile-ux
description: Mobile UX guidelines for iOS/Android/React Native apps. Touch targets, safe areas, gestures, accessibility, navigation patterns, forms, animations, and performance. Triggers on "mobile UX", "touch target", "safe area", "mobile accessibility", "react native UX", "app interface", "mobile patterns", "iOS guidelines", "Android guidelines", "haptic feedback".
allowed-tools: Read, Write, Edit, Glob, Grep
---

# Mobile UX Guidelines

> **Purpose:** Platform-specific UX rules for iOS, Android, and React Native apps.
> **Source:** Apple HIG + Material Design + ui-ux-pro-max data, curated for practical use.
> **Scope:** App UI only. For web UI, use `frontend-design` + `web-design-guidelines`.

---

## 🎯 When to Use

| Scenario | Section |
|----------|---------|
| Building mobile app (RN/Flutter/Native) | Read ALL sections |
| Adding form to mobile app | → Forms & Feedback |
| Designing navigation | → Navigation Patterns |
| Performance optimization | → Performance |
| Mobile web (responsive) | → Touch & Interaction + Safe Areas |
| Accessibility audit | → Accessibility (Priority 1) |

---

## Rules by Priority

| Priority | Category | Impact |
|----------|----------|--------|
| 🔴 1 | Accessibility | CRITICAL |
| 🔴 2 | Touch & Interaction | CRITICAL |
| 🟠 3 | Navigation Patterns | HIGH |
| 🟠 4 | Safe Areas | HIGH |
| 🟡 5 | Forms & Feedback | MEDIUM |
| 🟡 6 | Animation | MEDIUM |
| 🟡 7 | Performance | MEDIUM |
| 🔵 8 | Typography | MEDIUM |
| 🔵 9 | Theming | MEDIUM |

---

## 1. Accessibility (CRITICAL)

| Rule | Do ✅ | Don't ❌ | Severity |
|------|-------|----------|----------|
| **Icon Button Labels** | `accessibilityLabel="Close"` on icon buttons | Icon buttons without labels | Critical |
| **Form Control Labels** | Pair visible `<Text>` label + `accessibilityLabel` | Placeholder-only labels | Critical |
| **Role & Traits** | `accessibilityRole="button"` on Pressable | Generic View with onTouchStart | High |
| **Dynamic Updates** | `accessibilityLiveRegion="polite"` for status | Silent text updates | Medium |
| **Decorative Icons** | `accessible={false}` on decorative elements | Screen reader reads every icon | Medium |
| **Reduced Motion** | Check `reduceMotionEnabled`, simplify animations | Ignore motion preferences | Critical |
| **Screen Reader Order** | Logical reading order for VoiceOver/TalkBack | Random focus order | High |
| **Escape Routes** | Cancel/Back in modals and multi-step flows | Trap users in modal | High |

### Code Examples

```jsx
// ✅ Accessible icon button
<Pressable accessibilityLabel="Close" accessibilityRole="button">
  <XIcon />
</Pressable>

// ❌ Inaccessible
<Pressable>
  <XIcon />
</Pressable>

// ✅ Form with label
<View>
  <Text>Email</Text>
  <TextInput accessibilityLabel="Email address" />
</View>

// ❌ Placeholder only
<TextInput placeholder="Email" />

// ✅ Dynamic announcement
<Text accessibilityLiveRegion="polite">{status}</Text>

// ✅ Respect reduced motion
if (reduceMotionEnabled) skipAnimation();
```

---

## 2. Touch & Interaction (CRITICAL)

| Rule | Standard | Platform |
|------|----------|----------|
| **Minimum touch target** | 44×44pt (Apple) / 48×48dp (Material) | Both |
| **Touch spacing** | Min 8dp gap between targets | Both |
| **hitSlop extension** | Extend hit area beyond visual bounds | React Native |
| **No hover dependency** | Never rely on hover for core actions | All |
| **Tap delay** | `touch-action: manipulation` on web | Mobile web |
| **Press feedback** | Visual ripple/highlight on press | Material |
| **Haptic feedback** | For confirmations, avoid overuse | iOS |
| **Safe gesture zones** | Don't block system gestures (swipe-back, etc.) | iOS |
| **Swipe clarity** | Show affordance (chevron, label) for swipe actions | Both |
| **Drag threshold** | Use movement threshold before starting drag | Both |

### Code Examples

```jsx
// ✅ Extended touch target
<Pressable hitSlop={10}>
  <Icon style={{ width: 24, height: 24 }} />
</Pressable>

// ❌ Tiny touch target
<Pressable>
  <Icon style={{ width: 16, height: 16 }} />
</Pressable>

// ✅ Proper spacing
<View style={{ gap: 8 }}>
  <Button title="Save" />
  <Button title="Cancel" />
</View>
```

---

## 3. Navigation Patterns (HIGH)

| Rule | Do ✅ | Don't ❌ |
|------|-------|----------|
| **Back behavior** | `navigation.goBack()`, preserve state | `BackHandler.exitApp()` on first press |
| **Bottom tabs** | 3-5 items max | 6+ items in tab bar |
| **Modal escape** | Close button + swipe-down | Trap users in modal |
| **Screen state** | `unmountOnBlur: false` — preserve scroll/form | Reset state on every visit |
| **Deep linking** | Support URL-based navigation | No deep links |
| **Tab structure** | Home / Explore / Profile / Settings | Home / Explore / Shop / Cart / Profile / Settings / More |

### React Navigation Patterns

```jsx
// ✅ Preserve screen state
<Tab.Navigator screenOptions={{ unmountOnBlur: false }}>
  <Tab.Screen name="Home" component={Home} />
</Tab.Navigator>

// ✅ Modal with close
<Modal>
  <Button title="Close" onPress={onClose} />
  <View>{children}</View>
</Modal>
```

---

## 4. Safe Areas (HIGH)

| Rule | Description |
|------|-------------|
| **SafeAreaView** | Wrap ALL screens to avoid notch/gesture bar overlap |
| **Primary content** | Keep tappable elements away from edges |
| **Dynamic Island** | Account for iOS Dynamic Island area |
| **Gesture bar** | Don't place buttons near bottom edge |

```jsx
// ✅ Safe area wrapping
<SafeAreaView style={{ flex: 1 }}>
  <Screen />
</SafeAreaView>

// ❌ No safe area
<View style={{ flex: 1 }}>
  <Screen />
</View>
```

---

## 5. Forms & Feedback (MEDIUM)

| Rule | Do ✅ | Don't ❌ |
|------|-------|----------|
| **Loading indicators** | ActivityIndicator/skeleton for >300ms ops | Frozen button with no feedback |
| **Success feedback** | Toast/checkmark banner | Complete actions silently |
| **Error messages** | Inline error near field + summary | Only change border color |
| **Inline validation** | Validate on blur and submit | Validate every keystroke |
| **Keyboard type** | Match `keyboardType` (email/tel/number) | Default keyboard for all |
| **Auto focus** | `onSubmitEditing` → focus next input | Manual tap to each field |
| **Password toggle** | Show/Hide icon for `secureTextEntry` | Force blind typing |

### Code Examples

```jsx
// ✅ Correct keyboard type
<TextInput keyboardType="email-address" returnKeyType="next" />

// ✅ Auto-advance to next field
<TextInput
  onSubmitEditing={() => nextRef.current?.focus()}
  blurOnSubmit={false}
/>

// ✅ Loading button
{loading ? <ActivityIndicator /> : <Button title="Save" />}

// ✅ Inline error
<TextInput />
<Text style={{color: 'red'}}>{error}</Text>
```

---

## 6. Animation (MEDIUM)

| Rule | Standard |
|------|----------|
| **Duration** | 150–300ms for micro-interactions |
| **Enter easing** | `Easing.out(Easing.quad)` (decelerate) |
| **Exit easing** | `Easing.in(Easing.quad)` (accelerate) |
| **Reduced motion** | ALWAYS respect OS setting |
| **Continuous loops** | Only for loaders and live data |
| **Performance** | Animate only `transform` and `opacity` |

```jsx
// ✅ Proper timing + easing
Animated.timing(value, {
  duration: 200,
  easing: Easing.out(Easing.quad),
  useNativeDriver: true,
})

// ❌ Too slow + linear
Animated.timing(value, {
  duration: 800,
  easing: Easing.linear,
})
```

---

## 7. Performance (MEDIUM)

| Rule | Do ✅ | Don't ❌ |
|------|-------|----------|
| **Long lists** | `FlatList` with `keyExtractor` | `ScrollView` with `.map()` |
| **Images** | Proper `resizeMode`, cached | Full-resolution everywhere |
| **Debounce** | Throttle scroll/search handlers | Heavy logic on every event |

```jsx
// ✅ Virtualized list
<FlatList
  data={items}
  renderItem={renderItem}
  keyExtractor={item => item.id}
  initialNumToRender={10}
/>

// ❌ Non-virtualized
<ScrollView>
  {items.map(item => <ItemCard key={item.id} {...item} />)}
</ScrollView>
```

---

## 8. Typography (MEDIUM)

| Rule | Standard |
|------|----------|
| **Base font size** | 14-16pt minimum for body |
| **Dynamic Type** | `allowFontScaling={true}` (default) |
| **Don't disable scaling** | Never `allowFontScaling={false}` globally |
| **Test large text** | Verify layout at 200% font scale |
| **Line height** | 1.4-1.6 for body text |

---

## 9. Theming — Light/Dark Mode (MEDIUM)

| Rule | Do ✅ | Don't ❌ |
|------|-------|----------|
| **Semantic tokens** | `colors.textPrimary` varies by theme | Hardcoded colors |
| **Dark contrast** | `#F9FAFB` on `#111827` | `#9CA3AF` on `#111827` (low contrast) |
| **Test both themes** | Verify all screens in both modes | Only test light mode |
| **System preference** | Follow OS theme by default | Ignore system preference |

---

## 10. Anti-Patterns (AVOID!)

| Anti-Pattern | Why It's Bad | Fix |
|-------------|--------------|-----|
| **Gesture-only actions** | Users don't discover hidden gestures | Visible button + gesture shortcut |
| **Shake to undo** | No UI affordance, accessibility fail | Undo button + shake option |
| **Overloaded tab bar** | 6+ tabs = cognitive overload | 3-5 tabs + "More" screen |
| **Custom back behavior** | Breaks user expectations | Use platform standard |
| **Horizontal scroll main content** | Conflicts with system gestures | Vertical scroll default |
| **Disabling zoom** | Accessibility violation | Allow pinch-to-zoom |

---

## Pre-Delivery Checklist

Before shipping mobile UI:

### Accessibility
- [ ] All touch targets ≥ 44×44pt
- [ ] Icon buttons have `accessibilityLabel`
- [ ] Form inputs have visible labels
- [ ] `accessibilityRole` on interactive elements
- [ ] Reduced motion respected

### Navigation
- [ ] Back behavior predictable
- [ ] Bottom tabs ≤ 5
- [ ] Modals have close affordance
- [ ] Screen state preserved on return

### Layout
- [ ] SafeAreaView wrapping all screens
- [ ] No content under notch/gesture bar
- [ ] Tested in landscape (if supported)

### Performance
- [ ] FlatList for lists > 50 items
- [ ] Images properly sized and cached
- [ ] Animations use native driver

### Theme
- [ ] Works in light mode
- [ ] Works in dark mode
- [ ] Contrast ratios pass WCAG AA

---

## Related Skills

| Skill | Relationship |
|-------|-------------|
| `frontend-design` | Web design principles (complementary) |
| `react-native-skills` | React Native specific implementation |
| `web-design-guidelines` | Web interface audit (different scope) |
| `color-font-database` | Pick colors by product type |
