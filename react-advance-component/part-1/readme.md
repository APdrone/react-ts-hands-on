# using literals and optional fields

we can define propType as literals and can define property as optional as well using "?"

```ts
//Infobox.tsx

import { type ReactNode } from 'react';

type InfoBoxProps = {
  mode: 'hint' | 'warning';
  severity?: 'low' | 'medium' | 'high';
  children: ReactNode;
};

export default function InfoBox({ mode, severity, children }: InfoBoxProps) {
  if (mode === 'hint') {
    return (
      <aside className="infobox infobox-hint">
        <p>{children}</p>
      </aside>
    );
  }
  return (
    <aside className={`infobox infobox-warning warning--${severity}`}>
      <h2>Warning</h2>
      <p>{children}</p>
    </aside>
  );
}
```

# using discrimainated union

problem with above approach if we make a propery in prop optional, then we might forget to pass it in the component where it is required. for eg, for hint mode we dont want sverity but for warning we need it.

so here we want to make "severity" mandatory if "mode" is warning

```ts
type InfoBoxProps = {
  mode: 'hint' | 'warning';
  severity?: 'low' | 'medium' | 'high';
  children: ReactNode;
};

//example usuage
//not need in this
<InfoBox mode="hint">You have no course goals yet. Start adding some</InfoBox>;

//need in this
<InfoBox mode="warning" severity="high">
  Youre collecting a lot of goals. dont put too much on your plate
</InfoBox>;
```

we will use discriminated union

From:

```ts
type InfoBoxProps = {
  mode: 'hint' | 'warning';
  severity?: 'low' | 'medium' | 'high';
  children: ReactNode;
};
```

to

```ts
type HintBoxProps = {
  mode: 'hint';
  children: ReactNode;
};

type WarningBoxProps = {
  mode: 'warning';
  severity: 'low' | 'medium' | 'high';
  children: ReactNode;
};

type InfoBoxProps = HintBoxProps | WarningBoxProps;
```

but now we will get error on destructuing props ==> "Property 'severity' does not exist on type 'InfoBoxProps'."

```ts
import { type ReactNode } from 'react';

type HintBoxProps = {
  mode: 'hint';
  children: ReactNode;
};

type WarningBoxProps = {
  mode: 'warning';
  severity: 'low' | 'medium' | 'high';
  children: ReactNode;
};

type InfoBoxProps = HintBoxProps | WarningBoxProps;

//Property 'severity' does not exist on type 'InfoBoxProps'.
export default function InfoBox({ mode, severity, children }: InfoBoxProps) {
  if (mode === 'hint') {
    return (
      <aside className="infobox infobox-hint">
        <p>{children}</p>
      </aside>
    );
  }
  return (
    <aside className={`infobox infobox-warning warning--${severity}`}>
      <h2>Warning</h2>
      <p>{children}</p>
    </aside>
  );
}
```

we will change it to below

```ts
import { type ReactNode } from 'react';

type HintBoxProps = {
  mode: 'hint';
  children: ReactNode;
};

type WarningBoxProps = {
  mode: 'warning';
  severity: 'low' | 'medium' | 'high';
  children: ReactNode;
};

type InfoBoxProps = HintBoxProps | WarningBoxProps;

export default function InfoBox(props: InfoBoxProps) {
  //this propery is common in both types and thus can be destructure here
  const { children, mode } = props;
  if (mode === 'hint') {
    return (
      <aside className="infobox infobox-hint">
        <p>{children}</p>
      </aside>
    );
  }
  // we can destructure severity here as code reaches here only when mode is not "hint" as we have if check  and return statement after that
  const { severity } = props;
  return (
    <aside className={`infobox infobox-warning warning--${severity}`}>
      <h2>Warning</h2>
      <p>{children}</p>
    </aside>
  );
}
```
