"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Mail, CheckCircle, Loader2 } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useNewsletterStore } from "@/stores/newsletter-store";

const schema = z.object({
  email: z.string().email("Ingresa un email valido"),
});

type FormData = z.infer<typeof schema>;

export function NewsletterForm() {
  const { isLoading, isSubscribed, error, subscribe } = useNewsletterStore();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  const onSubmit = async (data: FormData) => {
    await subscribe(data.email);
  };

  if (isSubscribed) {
    return (
      <div className="flex items-center gap-2 text-spng-accent">
        <CheckCircle className="h-5 w-5" />
        <span className="text-sm">Gracias por suscribirte</span>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-2">
      <div className="flex gap-2">
        <div className="relative flex-1">
          <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-white/40" />
          <Input
            {...register("email")}
            type="email"
            placeholder="tu@email.com"
            className="pl-9 bg-white/5 border-white/10 text-white placeholder:text-white/40 focus-visible:ring-spng-accent"
            disabled={isLoading}
          />
        </div>
        <Button
          type="submit"
          disabled={isLoading}
          className="bg-spng-accent text-black hover:bg-spng-accent-light font-semibold shrink-0"
        >
          {isLoading ? (
            <Loader2 className="h-4 w-4 animate-spin" />
          ) : (
            "Suscribir"
          )}
        </Button>
      </div>
      {(errors.email || error) && (
        <p className="text-xs text-red-400">
          {errors.email?.message || error}
        </p>
      )}
    </form>
  );
}
