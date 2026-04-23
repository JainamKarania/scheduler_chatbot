from app.core.llm_provider import get_llm

from app.ai.tools import (

    create_task_tool,

    # create_appointment_tool,

    get_tasks_tool

)

from app.ai.prompt import SYSTEM_PROMPT

from langchain_core.messages import HumanMessage,SystemMessage,ToolMessage


llm = get_llm()

tools=[

    create_task_tool,

    # create_appointment_tool,

    get_tasks_tool

]

llm_with_tools = llm.bind_tools(tools)



def ask_agent(query:str,user_id:int):

    messages=[

        SystemMessage(content=SYSTEM_PROMPT),

        HumanMessage(

            content=f"User ID: {user_id}\n{query}"

        )

    ]

    response = llm_with_tools.invoke(messages)


    # Tool execution loop
    if response.tool_calls:

        for tool_call in response.tool_calls:

            tool_name=tool_call["name"]

            tool_args=tool_call["args"]

            tool_call_id=tool_call["id"]   # ← IMPORTANT


            # Inject user_id automatically
            tool_args["user_id"]=user_id


            for tool in tools:

                if tool.name==tool_name:

                    tool_result=tool.invoke(tool_args)


                    messages.append(response)

                    messages.append(

                        ToolMessage(

                            content=str(tool_result),

                            tool_call_id=tool_call_id   # ← REQUIRED

                        )

                    )

                    final_response=llm_with_tools.invoke(messages)

                    return final_response.content


    return response.content or "Request completed"