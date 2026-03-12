"use client"

import { SquareUser, BotMessageSquare } from "lucide-react";
import { Item, ItemContent, ItemDescription, ItemGroup, ItemMedia } from "./ui/item";
import { ChatDialogProps } from "./chat-dialog.types";
import { ChatMessage, MessageRole } from "@/types";

export default function ChatDialog({
    className,
    messages = [],
}: ChatDialogProps) {
    const calcItemClassName = (role: MessageRole) => {
        const defaultClasses = "shadow-sm"
        if (role === MessageRole.ASSISTANT) {
            return `${defaultClasses} max-w-9/10 bg-indigo-600`
        }
        return `${defaultClasses} max-w-9/10 ml-auto`
    }

    const getIcon = (role: MessageRole) => {
        if (role === MessageRole.ASSISTANT) {
            return <BotMessageSquare className="size-6"/>
        } else {
            return <SquareUser className="size-6"/>
        }
    }

    return (
        <>
            <ItemGroup className={"h-full gap-8 flex-col-reverse p-1 flex-auto w-full overflow-auto " + className}>
            {[...messages].reverse().map((message, index) => (
                <Item className={calcItemClassName(message.role)} variant="default" size="default" key={index}>
                    <ItemMedia variant="icon">
                        {getIcon(message.role)}
                    </ItemMedia>
                    <ItemContent>
                        {/* <ItemTitle>Title</ItemTitle> */}
                        <ItemDescription className="text-lg">{message.content}</ItemDescription>
                    </ItemContent>
                </Item>
            ))}
            </ItemGroup>
        </>
    )
}
