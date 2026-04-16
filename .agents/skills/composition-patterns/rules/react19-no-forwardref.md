---
title: React 19 API Changes
impact: MEDIUM
impactDescription: cleaner component definitions and context usage
tags: react19, refs, context, hooks
---

## React 19 API Changes

> **⚠️ React 19+ only.** Skip this if you're on React 18 or earlier.

In React 19, `ref` is now a regular prop (no `forwardRef` wrapper needed), and `use()` replaces `useContext()`.

**Incorrect (forwardRef in React 19):**

```tsx
const ComposerInput = forwardRef<TextInput, Props>((props, ref) => {
  return <TextInput ref={ref} {...props} />
})
```

**Correct (ref as a regular prop):**

```tsx
function ComposerInput({ ref, ...props }: Props & { ref?: React.Ref<TextInput> }) {
  return <TextInput ref={ref} {...props} />
}
```

**Incorrect (useContext in React 19):**

```tsx
const value = useContext(MyContext)
```

**Correct (use instead of useContext):**

```tsx
const value = use(MyContext)
```

`use()` can also be called conditionally, unlike `useContext()`.

---

### `useActionState()` replaces `useFormState()` (React 19)

```tsx
// React 18 (deprecated)
import { useFormState } from 'react-dom'

// React 19
import { useActionState } from 'react'

const [state, formAction, isPending] = useActionState(
  async (previousState, formData) => {
    const result = await submitForm(formData)
    return result
  },
  initialState
)
```

Note: `useActionState` returns a third value `isPending` — no need for separate loading state.

---

### `use(promise)` for Suspense Data Fetching (React 19)

```tsx
// Instead of useState + useEffect data fetching:
function UserProfile({ userPromise }: { userPromise: Promise<User> }) {
  const user = use(userPromise) // Suspends until resolved
  return <div>{user.name}</div>
}

// Usage: wrap in Suspense boundary
<Suspense fallback={<Skeleton />}>
  <UserProfile userPromise={fetchUser(id)} />
</Suspense>
```

---

### `useFormStatus()` for Pending Submit States (React 19)

```tsx
import { useFormStatus } from 'react-dom'

function SubmitButton() {
  const { pending } = useFormStatus()
  return (
    <button disabled={pending}>
      {pending ? 'Submitting...' : 'Submit'}
    </button>
  )
}

// Must be inside a <form> that uses a Server Action
<form action={serverAction}>
  <input name="email" />
  <SubmitButton />
</form>
```
