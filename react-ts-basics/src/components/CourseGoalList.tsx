import { type FC } from 'react';
import CourseGoals from './CourseGoals';
import { type CourseGoals as CGoal } from '../App';

type CourseGoalListProps = {
  goals: CGoal[];
  onDeleteGoal: (id: number) => void;
};

const CourseGoalList: FC<CourseGoalListProps> = ({ goals, onDeleteGoal }) => {
  return (
    <ul>
      {goals.map((goal) => (
        <li key={goal.id}>
          <CourseGoals id={goal.id} title={goal.title} onDeleteGoal={onDeleteGoal}>
            <p>{goal.description}</p>
          </CourseGoals>
        </li>
      ))}
    </ul>
  );
};

export default CourseGoalList;
