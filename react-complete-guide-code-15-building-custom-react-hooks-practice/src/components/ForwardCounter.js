import Card from './Card';
import useCounter from '../hooks/use-counter';

const ForwardCounter = () => {
  // useCounter가 관리하는 state에 접근해야함
  const counter = useCounter()
  return <Card>{counter}</Card>;
};

export default ForwardCounter;
