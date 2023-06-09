import { UseMutationResult } from "@tanstack/react-query"

export interface TodoIF {
  _id: string,
  title: string,
  status: boolean
}

export interface DataIF {
  todos: TodoIF[]
}

export interface PatchIF {
  id: string,
  status: boolean
}

export type AddTodoMutationResult = UseMutationResult<Response, unknown, object, unknown>;
export type MyMutationResult = UseMutationResult<Response, unknown, PatchIF, unknown>;
export type DeleteMutationResult = UseMutationResult<Response, unknown, string, unknown>;

