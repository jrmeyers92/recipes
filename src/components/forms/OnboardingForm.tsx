"use client";

import { onboard } from "@/actions/_onboarding";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Monthes } from "@/lib/MonthArray";
import { States } from "@/lib/StatesArray";
import { useUser } from "@clerk/nextjs";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { z } from "zod";

const formSchema = z.object({
  firstName: z
    .string()
    .min(2, { message: "First name must be more than two characters" })
    .max(255, { message: "First name must be less than 255 characters" }),
  lastName: z.string().min(3).max(255),
  email: z.string().email(),
  birthYear: z.number().min(1900).max(2021).optional(),
  birthMonth: z.string().optional(),
  birthDay: z.number().min(1).max(31).optional(),
  gender: z.enum(["male", "female", "nonBinary"]).optional(),
  city: z.string(),
  state: z.string(),
  zipCode: z.number().min(5),
});

const OnboardingForm = () => {
  const router = useRouter();
  const { isLoaded, user } = useUser();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      firstName: user?.firstName || "",
      lastName: user?.lastName || "",
      email: user?.primaryEmailAddress?.emailAddress || "",
      birthYear: undefined,
      birthMonth: undefined,
      birthDay: undefined,
      gender: undefined,
      city: undefined,
      state: undefined,
      zipCode: undefined,
    },
  });

  if (!isLoaded) {
    return <div>Loading</div>;
  }

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    const formData = new FormData();
    Object.entries(values).forEach(([key, value]) => {
      formData.append(key, String(value));
    });

    const res = await onboard(formData);
    if (res?.message) {
      await user?.reload();
      router.push("/");
    }
    if (res?.error) {
      // setError(res?.error);
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <div className="grid">
          <div className="flex w-full flex-col sm:flex-row sm:gap-4">
            <div className="w-1/2">
              <FormField
                control={form.control}
                name="firstName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>First Name</FormLabel>
                    <FormControl>
                      <Input placeholder="First Name" {...field} disabled />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="w-1/2">
              <FormField
                control={form.control}
                name="lastName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Last Name</FormLabel>
                    <FormControl>
                      <Input placeholder="Last Name" {...field} disabled />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </div>
          <div className="mt-0 flex flex-col sm:flex-row sm:gap-4">
            <div className="w-1/2">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input placeholder="Email" {...field} disabled />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="w-1/2"></div>
          </div>
          <div className="grid grid-cols-3 gap-2">
            <FormField
              control={form.control}
              name="city"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>City</FormLabel>
                  <FormControl>
                    <Input
                      type="text"
                      placeholder="City"
                      {...field}
                      onChange={(e) => {
                        field.onChange(e.target.value);
                      }}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="state"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>State</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select your state" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {States.map((state) => (
                        <SelectItem key={state} value={state}>
                          {state}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="zipCode"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Zip Code</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      placeholder="Zip Code"
                      {...field}
                      onChange={(e) => {
                        field.onChange(parseInt(e.target.value));
                      }}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className="sm:flex sm:flex-row sm:justify-between">
            <FormField
              control={form.control}
              name="gender"
              render={({ field }) => (
                <FormItem className="space-y-3">
                  <FormLabel>Gender</FormLabel>
                  <FormControl>
                    <RadioGroup
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                      className="flex flex-col space-y-1"
                    >
                      <FormItem className="flex items-center space-x-3 space-y-0">
                        <FormControl>
                          <RadioGroupItem value="male" />
                        </FormControl>
                        <FormLabel className="font-normal">Male</FormLabel>
                      </FormItem>
                      <FormItem className="flex items-center space-x-3 space-y-0">
                        <FormControl>
                          <RadioGroupItem value="female" />
                        </FormControl>
                        <FormLabel className="font-normal">Female</FormLabel>
                      </FormItem>
                      <FormItem className="flex items-center space-x-3 space-y-0">
                        <FormControl>
                          <RadioGroupItem value="nonBinary" />
                        </FormControl>
                        <FormLabel className="font-normal">
                          Non-binary
                        </FormLabel>
                      </FormItem>
                    </RadioGroup>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="max-w-1/2 w-1/2">
              <FormField
                control={form.control}
                name="birthYear"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Birth Year</FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        placeholder="Birth Year"
                        {...field}
                        onChange={(e) => {
                          field.onChange(parseInt(e.target.value));
                        }}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="birthMonth"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Birth Month</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Month you wore born." />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {Monthes.map((month) => (
                          <SelectItem key={month} value={month}>
                            {month}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="birthDay"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Birth Day</FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        placeholder="Birth Day"
                        {...field}
                        onChange={(e) => {
                          field.onChange(parseInt(e.target.value));
                        }}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </div>
        </div>

        <Button className="w-full" type="submit">
          Submit
        </Button>
      </form>
    </Form>
  );
};

export default OnboardingForm;
