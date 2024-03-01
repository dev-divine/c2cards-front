import { useNavigate } from "react-router-dom";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import toast from "react-hot-toast";

export function useResetPasswordController() {
  const navigate = useNavigate();

  const isPending = false;

  const schema = z.object({
    email: z.string(),
    token: z.string(),
  });

  type FormData = z.infer<typeof schema>;

  const {
    formState: { errors },
    control,
    handleSubmit: hookFormHandleSubmit,
  } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  const handleSubmit = hookFormHandleSubmit(async (data) => {
    try {
      // requisição back

      /*  signIn("token"); */

      toast.success("Email enviado com sucesso!");
      //navigate("/home");
      // const { access_token: accessToken } = await mutateAsync(data)
      // signIn(accessToken)
    } catch (error) {
      console.error(error, data);
      toast.error("Erro ao realizar login");
    }
  });

  return {
    errors,
    control,
    isPending,
    handleSubmit,
  };
}
