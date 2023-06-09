import React from "react";
import { postRequest } from "../config/axiosConfig";
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { AddTodoMutationResult } from "../types";

type State = {
  todo: string
}

type AddTodoProps = {
  mutation: AddTodoMutationResult
}

function postData<P extends object>(Component: React.ComponentType<P & AddTodoProps>) {
  const DataComponent = function (props: P): JSX.Element {
    const queryClient = useQueryClient()
    // Mutations
    const mutation = useMutation({
      mutationKey: ['addTodo'],
      mutationFn: (data: object) => postRequest("add-todo", data),
      onSuccess: () => queryClient.invalidateQueries(["Todo"])
    })
    return <Component {...props} mutation={mutation} />;
  };
  return DataComponent;
}

class AddTodo extends React.Component<AddTodoProps, State> {
  state = { todo: "" }

  handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const { mutation } = this.props
    mutation.mutate({ title: this.state.todo, status: false })
    this.setState({ todo: "" })
  }

  render(): React.ReactNode {
    const { todo } = this.state;
    return (
      <div className="px-6 py-8 shadow-lg rounded-xl w-full max-w-md mx-auto mt-8">
        <form
          onSubmit={this.handleSubmit}
        >
          <input type="text" className="block outline-none border border-gray-400 rounded h-9 w-full px-2"
            onChange={(e) => this.setState({ todo: e.target.value })}
            required
            value={todo}
          />
          <button type="submit" className="mt-4 px-4 py-2 block mx-auto w-fit rounded font-semibold text-base leading-5 text-white bg-teal-600">
            Add Todo
          </button>
        </form>
      </div>
    )
  }
}

const AddTodoComponent = postData(AddTodo);
export default AddTodoComponent;