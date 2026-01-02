{
 "cells": [
  {
   "cell_type": "markdown",
   "id": "1eefaa99",
   "metadata": {},
   "source": [
    "Word Document Formatter"
   ]
  },
  {
   "cell_type": "markdown",
   "id": "8c70c933",
   "metadata": {},
   "source": [
    "1. importing libraries"
   ]
  },
  {
   "cell_type": "code",
   "execution_count": 148,
   "id": "1c33bffd",
   "metadata": {},
   "outputs": [],
   "source": [
    "from langgraph.graph import StateGraph\n",
    "from langchain_core.messages import BaseMessage, HumanMessage\n",
    "from langchain_openai import ChatOpenAI\n",
    "from langchain_core.prompts import PromptTemplate\n",
    "from typing import TypedDict, Annotated, List, Dict, Optional, Literal, IO\n",
    "from langgraph.graph import add_messages\n",
    "from langchain_core.output_parsers import StrOutputParser\n",
    "from pydantic import BaseModel, Field\n",
    "from langchain_core.output_parsers import PydanticOutputParser\n",
    "from docx import Document\n",
    "from docx.shared import Pt\n",
    "from docx.enum.text import WD_ALIGN_PARAGRAPH"
   ]
  },
  {
   "cell_type": "code",
   "execution_count": 149,
   "id": "9a851d41",
   "metadata": {},
   "outputs": [
    {
     "data": {
      "text/plain": [
       "False"
      ]
     },
     "execution_count": 149,
     "metadata": {},
     "output_type": "execute_result"
    }
   ],
   "source": [
    "from dotenv import load_dotenv\n",
    "load_dotenv()"
   ]
  },
  {
   "cell_type": "code",
   "execution_count": null,
   "id": "da796606",
   "metadata": {},
   "outputs": [],
   "source": [
    "model = ChatOpenAI(\n",
    "    model=\"mistralai/devstral-2512:free\",\n",
    "    openai_api_base=\"https://openrouter.ai/api/v1\",\n",
    "    openai_api_key=\"\",\n",
    ")"
   ]
  },
  {
   "cell_type": "markdown",
   "id": "742e713d",
   "metadata": {},
   "source": [
    "2.states define"
   ]
  },
  {
   "cell_type": "code",
   "execution_count": 151,
   "id": "9544c3d5",
   "metadata": {},
   "outputs": [],
   "source": [
    "class DocStructure(BaseModel):\n",
    "    document_type: str = Field(\n",
    "        description=\"Type of document: academic, research, business, general\"\n",
    "    )\n",
    "\n",
    "    headings: Dict[str, int] = Field(\n",
    "        description=\"Detected headings mapped to heading level (e.g., {'Introduction': 1})\"\n",
    "    )\n",
    "\n",
    "    body_font_size: int = Field(\n",
    "        description=\"Target font size for body text\"\n",
    "    )\n",
    "\n",
    "    heading_font_size: int = Field(\n",
    "        description=\"Target font size for headings\"\n",
    "    )\n",
    "\n",
    "    alignment: str = Field(\n",
    "        description=\"Text alignment: left, right, center, justify\"\n",
    "    )\n",
    "\n",
    "    issues_found: List[str] = Field(\n",
    "        description=\"Formatting or structural issues detected\"\n",
    "    )\n"
   ]
  },
  {
   "cell_type": "code",
   "execution_count": 152,
   "id": "bc7cc7ac",
   "metadata": {},
   "outputs": [],
   "source": [
    "from enum import Enum\n",
    "\n",
    "class ActionEnum(str, Enum):\n",
    "    SET_FONT_SIZE = \"set_font_size\"\n",
    "    SET_ALIGNMENT = \"set_alignment\"\n",
    "    ALIGN_TEXT = \"align_text\"\n",
    "    FORMAT_AS_LIST = \"format_as_list\"\n",
    "    REMOVE_EMPTY_PARAGRAPHS = \"remove_empty_paragraphs\"\n",
    "\n",
    "# class TargetEnum(str, Enum):\n",
    "#     HEADING = \"heading\"\n",
    "#     SUBHEADING = \"subheading\"\n",
    "#     BODY_TEXT = \"body_text\"\n",
    "#     KEY_POINTS = \"key_points\"\n",
    "#     LIST_ITEMS = \"list_items\"\n",
    "#     DOCUMENT = \"document\"\n",
    "#     END_OF_DOCUMENT = \"end_of_document\"\n",
    "\n",
    "class FormatCommand(BaseModel):\n",
    "    action: ActionEnum\n",
    "    target: str\n",
    "    value: int | str   \n",
    "    source: Literal[\"auto\", \"user\"]\n"
   ]
  },
  {
   "cell_type": "code",
   "execution_count": 153,
   "id": "67b1a7dc",
   "metadata": {},
   "outputs": [],
   "source": [
    "class FormatCommandList(BaseModel):\n",
    "    commands: List[FormatCommand]"
   ]
  },
  {
   "cell_type": "code",
   "execution_count": 154,
   "id": "6c6d2296",
   "metadata": {},
   "outputs": [],
   "source": [
    "def last_write(_, new):\n",
    "    return new"
   ]
  },
  {
   "cell_type": "code",
   "execution_count": 155,
   "id": "33f1d910",
   "metadata": {},
   "outputs": [],
   "source": [
    "class wordFormatter(TypedDict, total=False):\n",
    "    doc: str\n",
    "    document: Document\n",
    "    structDoc: Annotated[list, last_write]\n",
    "    AutoDetect: Annotated[DocStructure, last_write]\n",
    "    AutoDetectCmd: Annotated[list, last_write]\n",
    "    userCmd: Annotated[list, last_write]\n",
    "    formatCmd: Annotated[list, last_write] \n",
    "    output_doc: Optional[str]\n",
    "    output_pdf: Optional[str]\n",
    "    user_instruction: str"
   ]
  },
  {
   "cell_type": "markdown",
   "id": "732e9985",
   "metadata": {},
   "source": [
    "3. nodes Building"
   ]
  },
  {
   "cell_type": "markdown",
   "id": "c9f4a615",
   "metadata": {},
   "source": [
    "NodeFn1: Loading the document"
   ]
  },
  {
   "cell_type": "code",
   "execution_count": 156,
   "id": "2e791913",
   "metadata": {},
   "outputs": [],
   "source": [
    "from docx import Document\n",
    "\n",
    "def load_docx(path: str):\n",
    "    doc = Document(path)\n",
    "    paragraphs = []\n",
    "\n",
    "    for p in doc.paragraphs:\n",
    "        paragraphs.append({\n",
    "            \"text\": p.text.strip(),\n",
    "            \"style\": p.style.name if p.style else None,\n",
    "            \"alignment\": p.alignment,\n",
    "            \"runs\": [\n",
    "                {\n",
    "                    \"text\": r.text,\n",
    "                    \"bold\": r.bold,\n",
    "                    \"italic\": r.italic,\n",
    "                    \"font_size\": r.font.size.pt if r.font.size else None\n",
    "                }\n",
    "                for r in p.runs\n",
    "            ]\n",
    "        })\n",
    "    return paragraphs\n"
   ]
  },
  {
   "cell_type": "code",
   "execution_count": 157,
   "id": "4bb38dae",
   "metadata": {},
   "outputs": [
    {
     "name": "stdout",
     "output_type": "stream",
     "text": [
      "[{'text': 'Introduction', 'style': 'Heading 1', 'alignment': None, 'runs': [{'text': 'Introduction', 'bold': None, 'italic': None, 'font_size': None}]}, {'text': 'Qwertyujnbvcddx', 'style': 'List Paragraph', 'alignment': None, 'runs': [{'text': 'Qwertyujnbvcddx', 'bold': None, 'italic': None, 'font_size': None}]}, {'text': 'Ertyhhbvcx', 'style': 'List Paragraph', 'alignment': None, 'runs': [{'text': 'Ertyhhbvcx', 'bold': None, 'italic': None, 'font_size': None}]}, {'text': 'sdfgbhcd', 'style': 'List Paragraph', 'alignment': None, 'runs': [{'text': 'sdfgbhcd', 'bold': None, 'italic': None, 'font_size': None}]}, {'text': 'This document is created for a word processing formatting project. The purpose of this file is to allow the user to apply formatting such as text justification, font size, font color, line spacing, and paragraph alignment.', 'style': 'Normal', 'alignment': None, 'runs': [{'text': 'This ', 'bold': None, 'italic': None, 'font_size': None}, {'text': 'document is created for a word processing formatting project. The purpose of this file is to allow the user to apply formatting such as text justification, font size, font color, line spacing, and paragraph alignment.', 'bold': None, 'italic': None, 'font_size': 18.0}]}, {'text': 'Project Description', 'style': 'Heading 1', 'alignment': None, 'runs': [{'text': 'Project Description', 'bold': None, 'italic': None, 'font_size': 10.0}]}, {'text': 'The project focuses on understanding basic document formatting techniques commonly used in professional and academic documents. Students are expected to modify the appearance of the text without changing the actual content provided in this document.', 'style': 'Normal', 'alignment': None, 'runs': [{'text': 'The project focuses on understanding basic document formatting techniques commonly used in professional and academic documents. Students are expected to modify the appearance of the text without changing the actual content provided in this document.', 'bold': None, 'italic': None, 'font_size': None}]}, {'text': 'Key points:', 'style': 'Normal', 'alignment': <WD_PARAGRAPH_ALIGNMENT.CENTER: 1>, 'runs': [{'text': 'Key points:', 'bold': None, 'italic': None, 'font_size': None}]}, {'text': 'To handle abc', 'style': 'Normal', 'alignment': <WD_PARAGRAPH_ALIGNMENT.CENTER: 1>, 'runs': [{'text': 'To handle abc', 'bold': None, 'italic': None, 'font_size': None}]}, {'text': 'To handle research', 'style': 'Normal', 'alignment': <WD_PARAGRAPH_ALIGNMENT.CENTER: 1>, 'runs': [{'text': 'To handle research', 'bold': None, 'italic': None, 'font_size': None}]}, {'text': 'To ease assignment', 'style': 'Normal', 'alignment': <WD_PARAGRAPH_ALIGNMENT.CENTER: 1>, 'runs': [{'text': 'To ease assignment', 'bold': None, 'italic': None, 'font_size': None}]}, {'text': 'Conclusion', 'style': 'Heading 1', 'alignment': None, 'runs': [{'text': 'Conclusion', 'bold': None, 'italic': None, 'font_size': None}]}, {'text': 'By applying appropriate formatting styles, this document can be transformed into a well-structured and visually appealing report. Proper formatting improves readability and enhances the overall presentation of written content.', 'style': 'Normal', 'alignment': None, 'runs': [{'text': 'By applying appropriate formatting styles, this document can be transformed into a well-structured and visually appealing report. Proper formatting improves readability and enhances the overall presentation of written content.', 'bold': None, 'italic': None, 'font_size': 14.0}]}, {'text': '', 'style': 'Normal', 'alignment': None, 'runs': []}, {'text': '', 'style': 'Normal', 'alignment': None, 'runs': []}, {'text': '', 'style': 'Normal', 'alignment': None, 'runs': []}, {'text': '', 'style': 'Normal', 'alignment': None, 'runs': []}, {'text': '', 'style': 'Normal', 'alignment': None, 'runs': []}]\n"
     ]
    }
   ],
   "source": [
    "loader = load_docx('Draft.docx')\n",
    "# doc = loader.load()\n",
    "print(loader)"
   ]
  },
  {
   "cell_type": "code",
   "execution_count": 158,
   "id": "557b6928",
   "metadata": {},
   "outputs": [],
   "source": [
    "def loadDocNode(state: wordFormatter) -> dict:\n",
    "    doc = Document(state[\"doc\"])\n",
    "    return {\n",
    "        \"document\": doc,\n",
    "        \"structDoc\": load_docx(state[\"doc\"])\n",
    "    }\n"
   ]
  },
  {
   "cell_type": "markdown",
   "id": "d61ee019",
   "metadata": {},
   "source": [
    "NodeFn2: Structure Analysis Agent node"
   ]
  },
  {
   "cell_type": "code",
   "execution_count": 159,
   "id": "63d0bbcf",
   "metadata": {},
   "outputs": [],
   "source": [
    "def docStructureNode(state: wordFormatter) -> dict:\n",
    "    struct_doc = state[\"structDoc\"]\n",
    "\n",
    "    parser = PydanticOutputParser(pydantic_object=DocStructure)\n",
    "\n",
    "    prompt = PromptTemplate(\n",
    "        template=\"\"\"\n",
    "You are a document structure analysis agent.\n",
    "\n",
    "Analyze the following document structure and produce a formatting plan.\n",
    "\n",
    "Document structure:\n",
    "{struct_doc}\n",
    "\n",
    "{format_instructions}\n",
    "\"\"\",\n",
    "        input_variables=[\"struct_doc\"],\n",
    "        partial_variables={\n",
    "            \"format_instructions\": parser.get_format_instructions()\n",
    "        }\n",
    "    )\n",
    "\n",
    "    response = model.invoke(\n",
    "        prompt.format(struct_doc=struct_doc)\n",
    "    )\n",
    "\n",
    "    return {\n",
    "        \"AutoDetect\": parser.parse(response.content)\n",
    "    }"
   ]
  },
  {
   "cell_type": "markdown",
   "id": "a1cf6168",
   "metadata": {},
   "source": [
    "NodeFn2.1 :converting to formatcmd"
   ]
  },
  {
   "cell_type": "code",
   "execution_count": 160,
   "id": "97a4e74c",
   "metadata": {},
   "outputs": [],
   "source": [
    "ACTION_DOC = \"\"\"\n",
    "Allowed actions (field `action`):\n",
    "- \"set_font_size\": Change font size for the specified target.\n",
    "- \"set_alignment\": Change paragraph alignment.\n",
    "- \"align_text\": Align only paragraphs containing specific text.\n",
    "- \"format_as_list\": Convert paragraphs into a bulleted list.\n",
    "- \"remove_empty_paragraphs\": Remove trailing empty paragraphs.\n",
    "\n",
    "\n",
    "Allowed target (field `target`):\n",
    "- anything present in the document can also be the target\n",
    "- \"heading\": All heading-style paragraphs (Heading 1–3).\n",
    "- \"subheading\": Subsections under headings.\n",
    "- \"body_text\": Normal body paragraphs.\n",
    "- \"key_points\": Paragraphs marked or inferred as key points.\n",
    "- \"list_items\": Existing bullet or numbered list items.\n",
    "- \"document\": Entire document.\n",
    "- \"end_of_document\": Only trailing paragraphs at the end.\n",
    "\n",
    "\n",
    "Return float values as integer not as string\n",
    "Do NOT invent new actions like \"justify\", \"bolden\", etc.\n",
    "\"\"\""
   ]
  },
  {
   "cell_type": "code",
   "execution_count": 161,
   "id": "03978c6f",
   "metadata": {},
   "outputs": [],
   "source": [
    "cmd_parser = PydanticOutputParser(pydantic_object=FormatCommandList)\n",
    "\n",
    "\n",
    "def AutoDetectCommandNode(state: wordFormatter) -> dict:\n",
    "    instruction = state[\"AutoDetect\"]  \n",
    "\n",
    "    prompt = PromptTemplate(\n",
    "        template=\"\"\"\n",
    "You are a document formatting planner.\n",
    "\n",
    "Given these issues:\n",
    "{issues}\n",
    "{action_doc}\n",
    "\n",
    "Generate formatting commands.\n",
    "Return them strictly in this format:\n",
    "{format_instructions}\n",
    "\"\"\",\n",
    "        input_variables=[\"issues\"],\n",
    "        partial_variables={\"format_instructions\": cmd_parser.get_format_instructions(),\n",
    "                           \"action_doc\": ACTION_DOC,}\n",
    "    )\n",
    "\n",
    "    response = model.invoke(prompt.format(issues=instruction.issues_found))\n",
    "    parsed = cmd_parser.parse(response.content)\n",
    "\n",
    "    return {\"AutoDetectCmd\": parsed.commands}\n"
   ]
  },
  {
   "cell_type": "markdown",
   "id": "56ea64a9",
   "metadata": {},
   "source": [
    "NodeFn3: User Instructions node"
   ]
  },
  {
   "cell_type": "code",
   "execution_count": 162,
   "id": "e319fc05",
   "metadata": {},
   "outputs": [],
   "source": [
    "cmd_parser = PydanticOutputParser(pydantic_object=FormatCommandList)\n",
    "\n",
    "\n",
    "\n",
    "def chatCommandNode(state: wordFormatter) -> dict:\n",
    "    instruction = state[\"user_instruction\"]\n",
    "\n",
    "    prompt = PromptTemplate(\n",
    "        template=\"\"\"\n",
    "        You are a document formatting planner\n",
    "        Given the user instruction\n",
    "        Instruction: {instruction}\n",
    "        {action_doc}\n",
    "        Generate formatting commands.\n",
    "        Return them strictly in this format:\n",
    "        {format_instructions}\n",
    "        \"\"\",\n",
    "        input_variables=[\"instruction\"],\n",
    "        partial_variables={\"format_instructions\": cmd_parser.get_format_instructions(),\n",
    "                           \"action_doc\": ACTION_DOC,}\n",
    "\n",
    "    )\n",
    "    response = model.invoke(prompt.format(instruction = instruction))\n",
    "    parsed = cmd_parser.parse(response.content)\n",
    "    \n",
    "    return {\n",
    "        \"userCmd\": parsed.commands\n",
    "    }"
   ]
  },
  {
   "cell_type": "code",
   "execution_count": 163,
   "id": "14d07135",
   "metadata": {},
   "outputs": [],
   "source": [
    "TARGET_SCOPE = {\n",
    "    \"document\": 0,      # global\n",
    "    \"text\": 0,\n",
    "    \"body_text\": 1,\n",
    "    \"heading\": 2,\n",
    "    \"list_items\": 2,\n",
    "}"
   ]
  },
  {
   "cell_type": "code",
   "execution_count": 164,
   "id": "8fca1b5c",
   "metadata": {},
   "outputs": [],
   "source": [
    "TARGET_PRIORITY = {\n",
    "    \"heading\": 1,\n",
    "    \"subheading\": 2,\n",
    "    \"body_text\": 3,\n",
    "    \"key_points\": 4,\n",
    "    \"list_items\": 5,\n",
    "    \"document\": 6,\n",
    "    \"end_of_document\": 7,\n",
    "    # any other targets can be added here\n",
    "}"
   ]
  },
  {
   "cell_type": "code",
   "execution_count": 165,
   "id": "131a3ff4",
   "metadata": {},
   "outputs": [],
   "source": [
    "def mergeCommandNode(state: wordFormatter) -> dict:\n",
    "    auto_cmd = state.get(\"AutoDetectCmd\") or []\n",
    "    user_cmd = state.get(\"userCmd\") or []\n",
    "\n",
    "    if not isinstance(auto_cmd, list):\n",
    "        raise TypeError(f\"AutoDetectCmd must be list, got {type(auto_cmd)}\")\n",
    "\n",
    "    if not isinstance(user_cmd, list):\n",
    "        raise TypeError(f\"userCmd must be list, got {type(user_cmd)}\")\n",
    "\n",
    "    resolved = {}\n",
    "\n",
    "    def scope(t): \n",
    "        return TARGET_SCOPE.get(t, 0)\n",
    "\n",
    "    def should_override(existing, incoming):\n",
    "        if incoming.source == \"user\" and existing.source == \"auto\":\n",
    "            return True\n",
    "        return scope(incoming.target) >= scope(existing.target)\n",
    "\n",
    "    for cmd in auto_cmd + user_cmd:\n",
    "        key = cmd.action\n",
    "        if key not in resolved or should_override(resolved[key], cmd):\n",
    "            resolved[key] = cmd\n",
    "\n",
    "    return {\"formatCmd\": list(resolved.values())}\n",
    "\n"
   ]
  },
  {
   "cell_type": "markdown",
   "id": "0118c8f3",
   "metadata": {},
   "source": [
    "NodeFn4: ToolcmdNode"
   ]
  },
  {
   "cell_type": "code",
   "execution_count": 177,
   "id": "391ec7c0",
   "metadata": {},
   "outputs": [],
   "source": [
    "def set_font_size_tool(doc, target: str, value: int):\n",
    "    \"\"\"Logic for font size\"\"\"\n",
    "    for p in doc.paragraphs:\n",
    "        if target == \"heading\" and \"Heading\" in p.style.name:\n",
    "            for r in p.runs: r.font.size = Pt(int(value))\n",
    "        elif target == \"body_text\" and \"Normal\" in p.style.name:\n",
    "            for r in p.runs: r.font.size = Pt(int(value))\n",
    "        elif target == \"document\":\n",
    "            for r in p.runs: r.font.size = Pt(int(value))\n",
    "    return f\"Set {target} font to {value}\"\n",
    "\n",
    "def set_alignment_tool(doc, target: str, value: str):\n",
    "    \"\"\"Logic for alignment\"\"\"\n",
    "    align_map = {\n",
    "        \"left\": WD_ALIGN_PARAGRAPH.LEFT,\n",
    "        \"center\": WD_ALIGN_PARAGRAPH.CENTER,\n",
    "        \"right\": WD_ALIGN_PARAGRAPH.RIGHT,\n",
    "        \"justify\": WD_ALIGN_PARAGRAPH.JUSTIFY,\n",
    "    }\n",
    "    for p in doc.paragraphs:\n",
    "        if target == \"document\" or target.lower() in p.text.lower():\n",
    "            p.paragraph_format.alignment = align_map.get(value.lower(), p.paragraph_format.alignment)\n",
    "\n",
    "    return f\"Set {target} alignment to {value}\""
   ]
  },
  {
   "cell_type": "code",
   "execution_count": 178,
   "id": "3c99463d",
   "metadata": {},
   "outputs": [],
   "source": [
    "# Map your FormatCommand.action strings to the functions\n",
    "\n",
    "\n",
    "TOOL_REGISTRY = {\n",
    "    \"set_font_size\": set_font_size_tool,\n",
    "    \"set_alignment\": set_alignment_tool,\n",
    "    \"align_text\": set_alignment_tool # Alias\n",
    "}\n",
    "\n",
    "\n",
    "\n",
    "def ToolcmdNode(state: wordFormatter) -> dict:\n",
    "    doc = state[\"document\"]\n",
    "    commands = state.get(\"formatCmd\", [])\n",
    "    \n",
    "    for cmd in commands:\n",
    "        func = TOOL_REGISTRY.get(cmd.action.value)\n",
    "        if func:\n",
    "            print(f\"Applying Action: {cmd.action} -> {cmd.target}\")\n",
    "            # Execute the tool\n",
    "            func(doc, cmd.target, cmd.value)\n",
    "        else:\n",
    "            print(f\"No tool found for action: {cmd.action}\")\n",
    "\n",
    "    output_path = \"Final_Formatted.docx\"\n",
    "    doc.save(output_path)\n",
    "    return {\"output_doc\": output_path}\n"
   ]
  },
  {
   "cell_type": "markdown",
   "id": "f4d6cba8",
   "metadata": {},
   "source": [
    "4.Graph Struct"
   ]
  },
  {
   "cell_type": "code",
   "execution_count": 179,
   "id": "19485487",
   "metadata": {},
   "outputs": [],
   "source": [
    "graph = StateGraph(wordFormatter)\n",
    "\n",
    "graph.add_node(\"load_docx\", loadDocNode)\n",
    "graph.add_node(\"doc_structure\", docStructureNode)\n",
    "graph.add_node(\"chat_command\", chatCommandNode)\n",
    "graph.add_node(\"AutoDetect_command\", AutoDetectCommandNode)\n",
    "graph.add_node(\"merge_command\", mergeCommandNode)\n",
    "graph.add_node('Toolcmd', ToolcmdNode)\n",
    "\n",
    "\n",
    "\n",
    "graph.set_entry_point(\"load_docx\")\n",
    "\n",
    "graph.add_edge(\"load_docx\", \"doc_structure\")\n",
    "graph.add_edge(\"load_docx\", \"chat_command\")\n",
    "graph.add_edge(\"doc_structure\", \"AutoDetect_command\")\n",
    "\n",
    "graph.add_edge(\"chat_command\", \"merge_command\")\n",
    "graph.add_edge(\"AutoDetect_command\", \"merge_command\")\n",
    "\n",
    "graph.add_edge(\"merge_command\", \"Toolcmd\")\n",
    "graph.set_finish_point(\"Toolcmd\")\n",
    "\n",
    "\n",
    "app = graph.compile()\n"
   ]
  },
  {
   "cell_type": "code",
   "execution_count": 169,
   "id": "b2392ca8",
   "metadata": {},
   "outputs": [
    {
     "name": "stdout",
     "output_type": "stream",
     "text": [
      "                    +-----------+                 \n",
      "                    | __start__ |                 \n",
      "                    +-----------+                 \n",
      "                          *                       \n",
      "                          *                       \n",
      "                          *                       \n",
      "                    +-----------+                 \n",
      "                    | load_docx |                 \n",
      "                    +-----------+                 \n",
      "                  ***           ***               \n",
      "                **                 ***            \n",
      "              **                      **          \n",
      "  +---------------+                     **        \n",
      "  | doc_structure |                      *        \n",
      "  +---------------+                      *        \n",
      "           *                             *        \n",
      "           *                             *        \n",
      "           *                             *        \n",
      "+--------------------+           +--------------+ \n",
      "| AutoDetect_command |           | chat_command | \n",
      "+--------------------+           +--------------+ \n",
      "                  ***           ***               \n",
      "                     **       **                  \n",
      "                       **   **                    \n",
      "                  +---------------+               \n",
      "                  | merge_command |               \n",
      "                  +---------------+               \n",
      "                          *                       \n",
      "                          *                       \n",
      "                          *                       \n",
      "                    +---------+                   \n",
      "                    | Toolcmd |                   \n",
      "                    +---------+                   \n",
      "                          *                       \n",
      "                          *                       \n",
      "                          *                       \n",
      "                    +---------+                   \n",
      "                    | __end__ |                   \n",
      "                    +---------+                   \n"
     ]
    }
   ],
   "source": [
    "app.get_graph().print_ascii()"
   ]
  },
  {
   "cell_type": "code",
   "execution_count": 170,
   "id": "ff2ba0e0",
   "metadata": {},
   "outputs": [],
   "source": [
    "# result = app.invoke({\n",
    "#      \"doc\": \"Draft.docx\",\n",
    "#      \"structDoc\": [],\n",
    "#      \"formatPlan\": [],\n",
    "#      \"output_doc\": []\n",
    "#  })\n",
    "\n",
    "# print(result[\"output_doc\"])\n",
    "# print(result[\"structDoc\"])\n",
    "# print(result[\"formatPlan\"])\n"
   ]
  },
  {
   "cell_type": "code",
   "execution_count": 180,
   "id": "281bf8f1",
   "metadata": {},
   "outputs": [
    {
     "name": "stdout",
     "output_type": "stream",
     "text": [
      "Applying Action: ActionEnum.SET_ALIGNMENT -> document\n",
      "Applying Action: ActionEnum.SET_FONT_SIZE -> heading\n",
      "No tool found for action: ActionEnum.FORMAT_AS_LIST\n",
      "No tool found for action: ActionEnum.REMOVE_EMPTY_PARAGRAPHS\n",
      "Applying Action: ActionEnum.ALIGN_TEXT -> Key points:\n",
      "Applying Action: ActionEnum.SET_ALIGNMENT -> document\n"
     ]
    }
   ],
   "source": [
    "res = app.invoke({\n",
    "    \"doc\": \"Draft.docx\",\n",
    "    \"user_instruction\": \"Justify doc\"\n",
    "})"
   ]
  },
  {
   "cell_type": "code",
   "execution_count": 172,
   "id": "ee5c2187",
   "metadata": {},
   "outputs": [
    {
     "name": "stdout",
     "output_type": "stream",
     "text": [
      "[FormatCommand(action=<ActionEnum.SET_FONT_SIZE: 'set_font_size'>, target='heading', value=12, source='auto'), FormatCommand(action=<ActionEnum.FORMAT_AS_LIST: 'format_as_list'>, target='list_items', value='bullet', source='auto'), FormatCommand(action=<ActionEnum.REMOVE_EMPTY_PARAGRAPHS: 'remove_empty_paragraphs'>, target='end_of_document', value='all', source='auto'), FormatCommand(action=<ActionEnum.ALIGN_TEXT: 'align_text'>, target='Key points:', value='left', source='auto'), FormatCommand(action=<ActionEnum.SET_ALIGNMENT: 'set_alignment'>, target='document', value='justify', source='user')]\n"
     ]
    }
   ],
   "source": [
    "print(res['formatCmd'])"
   ]
  },
  {
   "cell_type": "code",
   "execution_count": 173,
   "id": "61300867",
   "metadata": {},
   "outputs": [
    {
     "name": "stdout",
     "output_type": "stream",
     "text": [
      "document_type='academic' headings={'Introduction': 1, 'Project Description': 1, 'Conclusion': 1} body_font_size=12 heading_font_size=14 alignment='left' issues_found=[\"Inconsistent font sizes in headings (e.g., 'Project Description' has font size 10.0)\", 'Inconsistent font sizes in body text (e.g., some parts have font size 18.0 or 14.0)', \"List items ('Qwertyujnbvcddx', 'Ertyhhbvcx', 'sdfgbhcd') are not properly formatted as a list\", 'Multiple empty paragraphs at the end of the document', \"Some text is centered without clear justification (e.g., 'Key points:' and related items)\"]\n"
     ]
    }
   ],
   "source": [
    "print(res.get(\"AutoDetect\"))"
   ]
  },
  {
   "cell_type": "code",
   "execution_count": 174,
   "id": "90129c1c",
   "metadata": {},
   "outputs": [
    {
     "name": "stdout",
     "output_type": "stream",
     "text": [
      "[FormatCommand(action=<ActionEnum.SET_FONT_SIZE: 'set_font_size'>, target='heading', value=12, source='auto'), FormatCommand(action=<ActionEnum.SET_FONT_SIZE: 'set_font_size'>, target='body_text', value=12, source='auto'), FormatCommand(action=<ActionEnum.FORMAT_AS_LIST: 'format_as_list'>, target='list_items', value='bullet', source='auto'), FormatCommand(action=<ActionEnum.REMOVE_EMPTY_PARAGRAPHS: 'remove_empty_paragraphs'>, target='end_of_document', value='all', source='auto'), FormatCommand(action=<ActionEnum.ALIGN_TEXT: 'align_text'>, target='Key points:', value='left', source='auto')]\n"
     ]
    }
   ],
   "source": [
    "print(res.get(\"AutoDetectCmd\"))"
   ]
  },
  {
   "cell_type": "code",
   "execution_count": 175,
   "id": "b48330be",
   "metadata": {},
   "outputs": [
    {
     "name": "stdout",
     "output_type": "stream",
     "text": [
      "[FormatCommand(action=<ActionEnum.SET_ALIGNMENT: 'set_alignment'>, target='document', value='justify', source='user')]\n"
     ]
    }
   ],
   "source": [
    "print(res.get(\"userCmd\"))"
   ]
  },
  {
   "cell_type": "code",
   "execution_count": null,
   "id": "792a9b33",
   "metadata": {},
   "outputs": [],
   "source": []
  }
 ],
 "metadata": {
  "kernelspec": {
   "display_name": "env",
   "language": "python",
   "name": "python3"
  },
  "language_info": {
   "codemirror_mode": {
    "name": "ipython",
    "version": 3
   },
   "file_extension": ".py",
   "mimetype": "text/x-python",
   "name": "python",
   "nbconvert_exporter": "python",
   "pygments_lexer": "ipython3",
   "version": "3.12.5"
  }
 },
 "nbformat": 4,
 "nbformat_minor": 5
}
