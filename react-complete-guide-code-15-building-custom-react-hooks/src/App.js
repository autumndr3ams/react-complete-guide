import React, { useEffect, useState } from 'react';

import Tasks from './components/Tasks/Tasks';
import NewTask from './components/NewTask/NewTask';
import useHttp from './hooks/use-http';

function App() {
  const [tasks, setTasks] = useState([]);

  // 2. App함수가 실행될 때마다 객체들이 재생성되지 않도록 하기 위해 useCallback 사용(불변성보장)
  const transformTasks = (tasksObj) => {
    const loadedTasks = [];

    for (const taskKey in tasksObj) {
      loadedTasks.push({ id: taskKey, text: tasksObj[taskKey].text });
    }

    setTasks(loadedTasks);
  };

  // 4. useHttp 훅이 아니라 sendRequest에 url 파라미터 전달
  const { isLoading, error, sendRequest:fetchTasks } = useHttp(
    transformTasks
  );

  useEffect(() => {
    // sendRequest(alias로 이 파일에서는 fetchTasks가 됨)에 url 전달
    fetchTasks(
      {url: 'https://react-udemy-9e79f-default-rtdb.firebaseio.com/tasks.json'}, transformTasks
    );
  }, [fetchTasks]);

  // 이렇게 설정하면 무한루프 발생
  // 커스텀 훅을 사용하는 컴포넌트들이 fetchTask를 호출하면서 계속 state가 업데이트 되는 것으로 인식
  // useEffect(() => {
  //   fetchTasks();
  // }, [fetchTasks]);

  const taskAddHandler = (task) => {
    setTasks((prevTasks) => prevTasks.concat(task));
  };

  return (
    <React.Fragment>
      <NewTask onAddTask={taskAddHandler} />
      <Tasks
        items={tasks}
        loading={isLoading}
        error={error}
        onFetch={fetchTasks}
      />
    </React.Fragment>
  );
}

export default App;
