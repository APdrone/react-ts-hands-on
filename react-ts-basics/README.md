# using custom types in props

```ts
//components
 we can mention the keyword "type" in front in the import statement,

import { type ReactNode } from 'react';

type CourseGoalProps = { title: string; description: string };

export default function CourseGoals({ title, description }: CourseGoalProps) {
  return (
    <article>
      <div>
        <h2>{title}</h2>
        <p>{description}</p>
      </div>
      <button>DELETE</button>
    </article>
  );
}

//app

import CourseGoals from './components/CourseGoals';
export default function App() {
  return (
    <main>
      <CourseGoals title="Learn React and TS" description="Learn it from ground up" />
    </main>
  );
}
```

# using reactnode when using chilren

we can define children using reactNode

```ts
//component

import { type ReactNode } from 'react';

type CourseGoalProps = { title: string; children: ReactNode };

export default function CourseGoals({ title, children }: CourseGoalProps) {
  return (
    <article>
      <div>
        <h2>{title}</h2>
        <p>{description}</p>
        {/* <p>{children}</p> */}
      </div>
      <button>DELETE</button>
    </article>
  );
}

//app

import CourseGoals from './components/CourseGoals';
export default function App() {
  return (
    <main>
      <CourseGoals title="Learn React and TS">Learn it from groud up</CourseGoals>
    </main>
  );
}
```

# using PropsWithChildren

alternate way when working with children, we pass the other properties to this type

```ts
import { PropsWithChildren } from 'react';

type CourseGoalProps = PropsWithChildren<{ title: string; description: string }>;

export default function CourseGoals({ title, children }: CourseGoalProps) {
  return (
    <article>
      <div>
        <h2>{title}</h2>
        <p>{children}</p>
      </div>
      <button>DELETE</button>
    </article>
  );
}
```

# define funciotn as arrow

same method we can define like:

```ts
import { type FC } from 'react';

const CourseGoals: FC<CourseGoalProps> = ({ title, description }) => {
  return (
    <article>
      <div>
        <h2>{title}</h2>
        <p>{description}</p>
        {/* <p>{children}</p> */}
      </div>
      <button>DELETE</button>
    </article>
  );
};
```

# using setState()

when we declare code as

```ts
const [goals, setGoals] = useState([]);

function handleAddGoal() {
  setGoals([1]);
}
```

then set using setGoals we will get error as by default , if we hover over "goals" state we get type as "const goals: never[]" and on hovering over setGoals as "const setGoals: React.Dispatch<React.SetStateAction<never[]>>"

we get error we never dfefined what type of data it would hold, TS able to infer for basic types like we define it as string like below. but wont work for complex types like arrays

```ts
const [goals, setGoals] = useState('hello');
```

we can define it as to resolve it

```ts
type CourseGoals = {
  title: string;
  description: string;
  id: number;
};

const [goals, setGoals] = useState<CourseGoals[]>([]);
```

# using export to remove duplicate use of types

```ts
//app
export type CourseGoals = {
  title: string;
  description: string;
  id: number;
};

//component- CourseGoal

import { type CourseGoals as CGoal } from '../App';

type CourseGoalListProps = {
  goals: CGoal[];
  onDeleteGoal: (id: number) => void;
};
```

# type for form event

```ts

import {type FormEvent } from "react";

export default function NewGoal() {
    function handleSubmit(event:FormEvent){
        event.preventDefault();
    }

  return (
    <form onSubmit={handleSubmit}>
      <p>
        <label htmlFor="goal">Your goal</label>
        <input id="goal" type="text" />
      </p>
      <p>
        <label htmlFor="summary">Short Summary</label>
        <input id="summary" type="text" />
      </p>
      <p>
        <button>Add Goal</button>
      </p>
    </form>
  );


```

if we use arrow function then event type will be inferred automatically

```ts
  return (
    <form onSubmit={(event)=>handleSubmit(event)}>


```

# submit data

there are different ways to do it , one way is to use "formdata" provided by browser and to track the input typed in by user.

also to track input, we need to add "name" attributes in the input fields

```ts

export default function NewGoal() {
  function handleSubmit(event: FormEvent) {
    event.preventDefault();

    new FormData(event.currentTarget);

  }

  return (
    <form onSubmit={handleSubmit}>
      <p>
        <label htmlFor="goal">Your goal</label>
        <input id="goal" type="text" name='goal'/>
      </p>
      <p>
        <label htmlFor="summary">Short Summary</label>
        <input id="summary" type="text" name='summary'/>
      </p>
      <p>
        <button>Add Goal</button>
      </p>
    </form>
  );

```

but we will see on the line , as TS doesnt know whether the target is the form element

```ts
new FormData(event.currentTarget);
```

if we see the "FormEvent" is a generic type and thus we can assign it more specific type

got it from chatgpt

```ts
const formData = new FormData();

// Append data to the FormData object
formData.append('username', 'john_doe');
formData.append('email', 'john@example.com');

// Send the FormData object to a server using fetch
fetch('https://example.com/submit', {
  method: 'POST',
  body: formData,
})
  .then((response) => {
    // Handle response here
  })
  .catch((error) => {
    // Handle error here
  });
```

# using useref

"
when we use ref we get error on accessing "goal.current" and when we fix it using "goal.current!" then to access property "value" we get error again

Property 'value' does not exist on type 'never'.

```ts
import { useRef, type FormEvent } from 'react';

export default function NewGoal() {
  const goal = useRef(null);
  const summary = useRef(null);
  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    //Property 'value' does not exist on type 'never'.
    const enteredGoal = goal.current!.value;
  }

  return (
    <form onSubmit={handleSubmit}>
      <p>
        <label htmlFor="goal">Your goal</label>
        <input id="goal" type="text" ref={goal} />
      </p>
      <p>
        <label htmlFor="summary">Short Summary</label>
        <input id="summary" type="text" ref={summary} />
      </p>
      <p>
        <button>Add Goal</button>
      </p>
    </form>
  );
}
```

to fix it we see useRef is generic as well so can assign type to it

```ts
import { useRef, type FormEvent } from 'react';

export default function NewGoal() {
   const goal= useRef<HTMLInputElement>(null);
   const summary= useRef<HTMLInputElement>(null);
  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const enteredGoal=goal.current!.value;

  }

```
