import React from "react"
import TodoCard from "./components/TodoCard"
import AddTodo from "./components/AddTodo"
import { useQuery } from "@tanstack/react-query"
import { getRequest } from "./config/axiosConfig";
import { DataIF, TodoIF } from "./types";

const getTodo = () => getRequest("get-todo");

interface Props {
  data: DataIF
}

function getData<P extends object>(Component: React.ComponentType<P & Props>) {
  const DataComponent = function (props: P): JSX.Element {
    const { isLoading, data } = useQuery({ queryKey: ["Todo"], queryFn: getTodo });
    if (isLoading) {
      return <div>Loading...</div>;
    }
    return <Component {...props} data={data} />;
  };
  return DataComponent;
}

class App extends React.Component<Props> {
  render() {
    const { data } = this.props;
    return (
      <main className="max-w-4xl mx-auto px-5">
        <AddTodo />
        <div className="grid grid-cols-2 gap-4 mt-12">
          {data.todos.map((item: TodoIF, index) => <TodoCard key={index} item={item} />)}
        </div>
      </main>
    )
  }
}

const AppComponent = getData(App);
export default AppComponent;
