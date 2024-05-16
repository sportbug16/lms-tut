"use client";

import * as z from "zod";
import axios from "axios";
import Link from "next/link";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import {
    Form, 
    FormControl,
    FormDescription,
    FormField,
    FormLabel,
    FormMessage,
    FormItem
} from "@/components/ui/form";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import toast from "react-hot-toast";

const formSchema = z.object({
    title : z.string().min(1, {
        message: "Title is required"
    }),
});
const CreatePage = () => {
    const router = useRouter();
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            title: "",
        },
    });

    const { isSubmitting, isValid } = form.formState;

    const onSubmit = async (values: z.infer<typeof formSchema>) => {
        try{
            const response = await axios.post("/api/courses", values);
            router.push(`/teacher/courses/${response.data.id}`);
            toast.success("Course Created!");
        } catch {
            toast.error("Something Went Wrong!");
        }
    }
    return ( 
        <div className="max-w-5xl mx-auto flex md:items-center md:justify-center h-full p-6">
            <div>
                <h1 className="text-2xl">Name of Course</h1>
                <p className="text-sm text-slate-600">Give a name to your course. It's changeable.</p>
                <Form {...form}> 
                    <form 
                        onSubmit={form.handleSubmit(onSubmit)}
                        className="space-y-8"
                    >
                        <FormField 
                            control={form.control}
                            name="title"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Course Title</FormLabel>
                                    <FormControl>
                                        <Input 
                                            disabled = {isSubmitting}
                                            placeholder = "e.g. 'MUP'"
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormDescription>
                                        A short brief for your course.
                                    </FormDescription>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <div className="flex items-center gap-x-2">
                            <Link href="/">
                                <Button
                                    type = "button"
                                    variant={"ghost"}
                                    >Cancel
                                </Button>  
                            </Link>
                            <Button
                                type = "submit"
                                disabled={!isValid || isSubmitting}
                                >Continue
                            </Button>
                        </div> 
                    </form>
                </Form>
            </div>
        </div>
     );
}
 
export default CreatePage;