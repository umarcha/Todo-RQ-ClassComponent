import React from "react";
import { DeleteMutationResult, MyMutationResult, PatchIF, TodoIF } from "../types";
import { deleteRequest, patchRequest } from "../config/axiosConfig";
import { useMutation, useQueryClient } from "@tanstack/react-query"

interface TodoCardProps {
  item?: TodoIF,
  updateMutation?: MyMutationResult,
  deleteMutation?: DeleteMutationResult,
}


function postData<P extends object>(Component: React.ComponentType<P & TodoCardProps>) {
  const DataComponent = function (props: P & Omit<TodoCardProps, 'item'> & { item: TodoIF }): JSX.Element {
    const queryClient = useQueryClient()
    // Mutations
    const updateMutation = useMutation({
      mutationKey: ['update-todo'],
      mutationFn: (data: PatchIF) => patchRequest(`update/${data.id}`, { status: data.status }),
      onSuccess: () => queryClient.invalidateQueries(["Todo"])
    })
    const deleteMutation = useMutation({
      mutationKey: ['delete-todo'],
      mutationFn: (id: string) => deleteRequest(`delete/${id}`),
      onSuccess: () => queryClient.invalidateQueries(["Todo"])
    })
    return <Component {...props} updateMutation={updateMutation} deleteMutation={deleteMutation} />;
  };
  return DataComponent;
}

class TodoCard extends React.Component<TodoCardProps> {

  updateStatus = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { item } = this.props
    const { updateMutation } = this.props
    const status = e.target.checked
    if (typeof updateMutation === "object" && typeof item === "object") {
      console.log(`ID: ${item._id}, status ${status}`);
      updateMutation.mutate({ id: item._id, status: status })
    }
  }

  handleDelete = () => {
    console.log("Delete Button Clicked");
    const { item } = this.props
    const { deleteMutation } = this.props
    if (typeof deleteMutation === "object" && typeof item === "object") {
      console.log(`ID: ${item._id}`);
      deleteMutation.mutate(item._id)
    }
  }

  render(): React.ReactNode {
    const { item } = this.props;
    return (
      <div className="px-4 py-6 rounded-md bg-white shadow-md">
        <div className="flex gap-3 justify-between items-center">
          <h5 className={`${item?.status && 'line-through text-gray-400'}`}>{item?.title}</h5>
          <input type="checkbox" checked={item?.status} className="cursor-pointer"
            onChange={this.updateStatus} />
        </div>
        <div className="flex justify-center mt-4">
          <button
            onClick={this.handleDelete}
            className="bg-red-600 rounded-md px-3 py-2 text-xs text-white">
            Delete
          </button>
        </div>
      </div>
    )
  }
}

const TodoCardComponent = postData(TodoCard);
export default TodoCardComponent;