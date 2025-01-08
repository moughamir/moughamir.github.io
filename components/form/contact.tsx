"use client";

import contactFormSchema from "@/lib/form-schema";
import { Form, useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormDescription,
  FormMessage,
} from "@/components/ui/form";
import { Textarea } from "../ui/textarea";
import { Separator } from "@radix-ui/react-separator";
import { Github, Linkedin, Mail, Phone } from "lucide-react";

import {
  Drawer,
  DrawerTrigger,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerDescription,
  DrawerFooter,
  DrawerClose,
} from "../ui/drawer";

export function ContactForm() {
  const form = useForm<z.infer<typeof contactFormSchema>>({
    resolver: zodResolver(contactFormSchema),
    defaultValues: {
      name: "",
      email: "",
      message: "",
    },
  });
  function onSubmit(values: z.infer<typeof contactFormSchema>) {
    console.log(values);
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <>
              <FormItem>
                <FormLabel>Username</FormLabel>
                <FormControl>
                  <Input placeholder="Your Name" {...field} />
                </FormControl>
                <FormDescription>
                  This is your public display name.
                </FormDescription>
                <FormMessage />
              </FormItem>
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input placeholder="interesting@inbox" {...field} />
                </FormControl>
                <FormDescription>
                  This is your public display name.
                </FormDescription>
                <FormMessage />
              </FormItem>
              <FormItem>
                <FormLabel htmlFor="message">Message</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="Type your message here."
                    {...field}
                    id="message"
                  />
                </FormControl>
                <FormDescription>
                  This is your public display name.
                </FormDescription>
                <FormMessage />
              </FormItem>
            </>
          )}
        />
        <Button type="submit">Submit</Button>
      </form>
    </Form>
  );
}

export function GetInTouch() {
  return (
    <Drawer>
      <DrawerTrigger asChild>
        <Button
          variant="outline"
          size={"lg"}
          className="text-gray-800 text-3xl p-8 hover:bg-black hover:text-zinc-50"
        >
          Get In Touch
        </Button>
      </DrawerTrigger>
      <DrawerContent>
        <div className="mx-auto w-full max-w-sm">
          <DrawerHeader>
            <DrawerTitle className="text-7xl font-bold tracking-tighter text-center">
              Hello
            </DrawerTitle>
            <DrawerDescription className="text-justify text-lg max-w-prose mb-4 mix-blend-exclusion  text-zinc-50 ">
              Whether you&apos;re looking to collaborate on a project, need
              expert advice, or simply want to connect, I&apos;m here to help.
              <br />
              Let&apos;s turn your ideas into reality and create something
              amazing together.
              <br />
              Don&apos;t hesitate to reach out
              <br />
              I&apos;m excited to hear from you!
            </DrawerDescription>
          </DrawerHeader>

          <div className="p-4 pb-0">
            <div className="flex items-center justify-center space-x-2">
              <p>
                <a href="tel:+212629144679">
                  <Phone />
                </a>
              </p>
              <Separator orientation="vertical" />

              <p>
                <a href="mailto:moughamir@gmail.com">
                  <Mail />
                </a>
              </p>
              <Separator orientation="vertical" />

              <p>
                <a href="https://linkedin.com/in/moughamir">
                  <Linkedin />
                </a>
              </p>
              <Separator orientation="vertical" />

              <p>
                <a href="https://github.com/moughamir">
                  <Github />
                </a>
              </p>
            </div>
            <div className="mt-3 h-[120px]">
              <div className="contact-info"></div>
            </div>
          </div>
          <DrawerFooter>
            <DrawerClose asChild>
              <Button variant="outline">Cancel</Button>
            </DrawerClose>
          </DrawerFooter>
        </div>
      </DrawerContent>
    </Drawer>
  );
}
