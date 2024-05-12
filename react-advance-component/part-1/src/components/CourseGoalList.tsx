import { ReactNode, type FC } from 'react';
import CourseGoals from './CourseGoals';
import { type CourseGoals as CGoal } from '../App';
import InfoBox from './InfoBox';

type CourseGoalListProps = {
  goals: CGoal[];
  onDeleteGoal: (id: number) => void;
};

const CourseGoalList: FC<CourseGoalListProps> = ({ goals, onDeleteGoal }) => {
  if (goals.length === 0) {
    return <InfoBox mode="hint">You have no course goals yet. Start adding some</InfoBox>;
  }

  let warningBox: ReactNode;

  if (goals.length >= 4) {
    warningBox = (
      <InfoBox mode="warning" severity="high">
        You're collecting a lot of goals. dont put too much on your plate
      </InfoBox>
    );
  }

  return (
    <>
      {warningBox}
      <ul>
        {goals.map((goal) => (
          <li key={goal.id}>
            <CourseGoals id={goal.id} title={goal.title} onDeleteGoal={onDeleteGoal}>
              <p>{goal.description}</p>
            </CourseGoals>
          </li>
        ))}
      </ul>
    </>
  );
};

export default CourseGoalList;
