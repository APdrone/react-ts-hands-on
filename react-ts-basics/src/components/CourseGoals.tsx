import { type PropsWithChildren } from 'react';

// type CourseGoalProps = { title: string; description: string };
// type CourseGoalProps = { title: string; children: ReactNode };
// type CourseGoalProps = PropsWithChildren<{ title: string; description: string }>;
type CourseGoalProps = PropsWithChildren<{ id: number; title: string; onDeleteGoal: (id: number) => void }>;

export default function CourseGoals({ id, title, children, onDeleteGoal }: CourseGoalProps) {
  // export default function CourseGoals({ title, description }: CourseGoalProps) {
  return (
    <article>
      <div>
        <h2>{title}</h2>
        {/* <p>{description}</p> */}
        {children}
      </div>
      <button onClick={() => onDeleteGoal(id)}>DELETE</button>
    </article>
  );
}
