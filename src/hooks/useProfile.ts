"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  getProfile,
  getAccessToken,
  updateProfile,
  type Profile,
  type UpdateProfilePayload,
} from "@/lib/api";

export function useProfile() {
  return useQuery({
    queryKey: ["profile"],
    queryFn: getProfile,
    enabled: typeof window !== "undefined" && !!getAccessToken(),
    retry: false,
    staleTime: 5 * 60 * 1000,
  });
}

export function useUpdateProfile() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (payload: UpdateProfilePayload) => updateProfile(payload),
    onSuccess: (res) => {
      queryClient.setQueryData<Profile>(["profile"], res.data);
    },
  });
}
