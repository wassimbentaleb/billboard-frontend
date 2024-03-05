import {
  createNewUserAPI,
  deleteUserAPI,
  getUserAPI,
  updateUserAPI,
} from "../../services/service";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

//CREATE hook (post new user to api)
export function useCreateUser() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (user) => {
      const response = await createNewUserAPI(user);
      console.log("New User Added:", response);
    },

    onMutate: (newUserInfo) => {
      queryClient.setQueryData(["users"], (prevUsers) => {
        const updatedUsers = prevUsers || [];
        return [
          ...updatedUsers,
          {
            ...newUserInfo,
            id: (Math.random() + 1).toString(36).substring(7),
          },
        ];
      });
    },
  });
}

//READ hook (get users from api)
export function useGetUsers() {
  return useQuery({
    queryKey: ["users"],
    queryFn: async () => {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      const response = await getUserAPI();
      console.log(response);
      const userData = response.posts;
      console.log(userData);
      return Promise.resolve(userData);
    },
    refetchOnWindowFocus: true,
  });
}

//UPDATE hook (put user in api)
export function useUpdateUser() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (user, sdf) => {
      const response = await updateUserAPI(user);
      console.log("Update user", response);
    },

    onMutate: (newUserInfo) => {
      queryClient.setQueryData(["users"], (prevUsers) =>
        prevUsers?.map((prevUser) =>
          prevUser.ID === newUserInfo.ID ? newUserInfo : prevUser
        )
      );
    },
  });
}

//DELETE hook (delete user in api)
export function useDeleteUser() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (userId) => {
      await deleteUserAPI(userId);
    },

    onMutate: async (userId) => {
      queryClient.setQueryData(["users"], (prevUsers) =>
        prevUsers?.filter((user) => {
          console.log(user);
          return user.ID !== userId;
        })
      );
    },
  });
}
