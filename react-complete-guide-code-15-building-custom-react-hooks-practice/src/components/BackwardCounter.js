import Card from './Card';
import useCounter from '../hooks/use-counter';

const BackwardCounter = () => {
  // useCounter가 관리하는 state에 접근해야함
  const counter = useCounter(false)
  return <Card>{counter}</Card>;
};

export default BackwardCounter;
