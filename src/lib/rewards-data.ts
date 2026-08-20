export type RewardType = "facts" | "questionsAnswers" | "flags" | "randomFactWidget" | "quoteOfTheDayWidget" | "vocabulary" | "dadJokeWidget";

export interface QuestionAnswerReward {
  question: string;
  answer: string;
}

export interface FlagReward {
  countryName: string;
  flagCode: string; // e.g., 'de', 'us', 'al'
}

export interface VocabularyReward {
  question: string;
  answer: string;
}

export interface Reward {
  type: RewardType;
  content: string | QuestionAnswerReward | FlagReward | VocabularyReward | null; // content can be null for widgets
}

const allFacts: string[] =<dyad-problem-report summary="164 problems">
<problem file="src/components/DadJokeWidget.tsx" line="39" column="6" code="17008">JSX element 'div' has no corresponding closing tag.</problem>
<problem file="src/components/DadJokeWidget.tsx" line="40" column="8" code="17008">JSX element 'div' has no corresponding closing tag.</problem>
<problem file="src/components/DadJokeWidget.tsx" line="42" column="10" code="17008">JSX element 'span' has no corresponding closing tag.</problem>
<problem file="src/components/DadJokeWidget.tsx" line="42" column="33" code="17008">JSX element 'dyad-write' has no corresponding closing tag.</problem>
<problem file="src/components/DadJokeWidget.tsx" line="49" column="37" code="1382">Unexpected token. Did you mean `{'>'}` or `&gt;`?</problem>
<problem file="src/components/DadJokeWidget.tsx" line="50" column="3" code="1109">Expression expected.</problem>
<problem file="src/components/DadJokeWidget.tsx" line="50" column="36" code="17008">JSX element 'string' has no corresponding closing tag.</problem>
<problem file="src/components/DadJokeWidget.tsx" line="51" column="42" code="17008">JSX element 'boolean' has no corresponding closing tag.</problem>
<problem file="src/components/DadJokeWidget.tsx" line="52" column="38" code="17008">JSX element 'boolean' has no corresponding closing tag.</problem>
<problem file="src/components/DadJokeWidget.tsx" line="54" column="31" code="1382">Unexpected token. Did you mean `{'>'}` or `&gt;`?</problem>
<problem file="src/components/DadJokeWidget.tsx" line="55" column="21" code="1005">'}' expected.</problem>
<problem file="src/components/DadJokeWidget.tsx" line="58" column="7" code="1109">Expression expected.</problem>
<problem file="src/components/DadJokeWidget.tsx" line="59" column="16" code="1005">'}' expected.</problem>
<problem file="src/components/DadJokeWidget.tsx" line="60" column="17" code="1005">'}' expected.</problem>
<problem file="src/components/DadJokeWidget.tsx" line="62" column="9" code="1381">Unexpected token. Did you mean `{'}'}` or `&rbrace;`?</problem>
<problem file="src/components/DadJokeWidget.tsx" line="63" column="7" code="1381">Unexpected token. Did you mean `{'}'}` or `&rbrace;`?</problem>
<problem file="src/components/DadJokeWidget.tsx" line="65" column="9" code="1109">Expression expected.</problem>
<problem file="src/components/DadJokeWidget.tsx" line="66" column="7" code="1381">Unexpected token. Did you mean `{'}'}` or `&rbrace;`?</problem>
<problem file="src/components/DadJokeWidget.tsx" line="69" column="5" code="1381">Unexpected token. Did you mean `{'}'}` or `&rbrace;`?</problem>
<problem file="src/components/DadJokeWidget.tsx" line="70" column="21" code="1005">'}' expected.</problem>
<problem file="src/components/DadJokeWidget.tsx" line="71" column="5" code="1381">Unexpected token. Did you mean `{'}'}` or `&rbrace;`?</problem>
<problem file="src/components/DadJokeWidget.tsx" line="72" column="24" code="1005">'}' expected.</problem>
<problem file="src/components/DadJokeWidget.tsx" line="73" column="5" code="1381">Unexpected token. Did you mean `{'}'}` or `&rbrace;`?</problem>
<problem file="src/components/DadJokeWidget.tsx" line="74" column="3" code="1381">Unexpected token. Did you mean `{'}'}` or `&rbrace;`?</problem>
<problem file="src/components/DadJokeWidget.tsx" line="76" column="17" code="1382">Unexpected token. Did you mean `{'>'}` or `&gt;`?</problem>
<problem file="src/components/DadJokeWidget.tsx" line="77" column="16" code="1005">'}' expected.</problem>
<problem file="src/components/DadJokeWidget.tsx" line="78" column="3" code="1381">Unexpected token. Did you mean `{'}'}` or `&rbrace;`?</problem>
<problem file="src/components/DadJokeWidget.tsx" line="112" column="1" code="1381">Unexpected token. Did you mean `{'}'}` or `&rbrace;`?</problem>
<problem file="src/components/DadJokeWidget.tsx" line="114" column="30" code="1005">'</' expected.</problem>
<problem file="src/lib/rewards-data.ts" line="91" column="6" code="1005">'>' expected.</problem>
<problem file="src/lib/rewards-data.ts" line="91" column="13" code="1005">',' expected.</problem>
<problem file="src/lib/rewards-data.ts" line="91" column="53" code="1005">',' expected.</problem>
<problem file="src/lib/rewards-data.ts" line="92" column="13" code="1005">',' expected.</problem>
<problem file="src/lib/rewards-data.ts" line="130" column="10" code="1005">'>' expected.</problem>
<problem file="src/lib/rewards-data.ts" line="130" column="19" code="1005">')' expected.</problem>
<problem file="src/lib/rewards-data.ts" line="131" column="12" code="1005">'>' expected.</problem>
<problem file="src/lib/rewards-data.ts" line="131" column="21" code="1005">';' expected.</problem>
<problem file="src/lib/rewards-data.ts" line="132" column="16" code="1005">'>' expected.</problem>
<problem file="src/lib/rewards-data.ts" line="132" column="25" code="1005">';' expected.</problem>
<problem file="src/lib/rewards-data.ts" line="132" column="37" code="1109">Expression expected.</problem>
<problem file="src/lib/rewards-data.ts" line="133" column="18" code="1005">';' expected.</problem>
<problem file="src/lib/rewards-data.ts" line="133" column="38" code="1005">';' expected.</problem>
<problem file="src/lib/rewards-data.ts" line="133" column="40" code="1434">Unexpected keyword or identifier.</problem>
<problem file="src/lib/rewards-data.ts" line="133" column="50" code="1161">Unterminated regular expression literal.</problem>
<problem file="src/lib/rewards-data.ts" line="134" column="8" code="1161">Unterminated regular expression literal.</problem>
<problem file="src/lib/rewards-data.ts" line="137" column="14" code="1005">'>' expected.</problem>
<problem file="src/lib/rewards-data.ts" line="137" column="23" code="1005">')' expected.</problem>
<problem file="src/lib/rewards-data.ts" line="138" column="20" code="1005">'>' expected.</problem>
<problem file="src/lib/rewards-data.ts" line="138" column="29" code="1005">':' expected.</problem>
<problem file="src/lib/rewards-data.ts" line="138" column="54" code="1109">Expression expected.</problem>
<problem file="src/lib/rewards-data.ts" line="139" column="22" code="1005">';' expected.</problem>
<problem file="src/lib/rewards-data.ts" line="139" column="27" code="1434">Unexpected keyword or identifier.</problem>
<problem file="src/lib/rewards-data.ts" line="139" column="34" code="1128">Declaration or statement expected.</problem>
<problem file="src/lib/rewards-data.ts" line="139" column="38" code="1110">Type expected.</problem>
<problem file="src/lib/rewards-data.ts" line="140" column="10" code="1161">Unterminated regular expression literal.</problem>
<problem file="src/lib/rewards-data.ts" line="141" column="7" code="1128">Declaration or statement expected.</problem>
<problem file="src/lib/rewards-data.ts" line="141" column="9" code="1128">Declaration or statement expected.</problem>
<problem file="src/lib/rewards-data.ts" line="142" column="14" code="1005">'>' expected.</problem>
<problem file="src/lib/rewards-data.ts" line="142" column="23" code="1005">')' expected.</problem>
<problem file="src/lib/rewards-data.ts" line="143" column="19" code="1005">':' expected.</problem>
<problem file="src/lib/rewards-data.ts" line="143" column="26" code="1434">Unexpected keyword or identifier.</problem>
<problem file="src/lib/rewards-data.ts" line="143" column="32" code="1434">Unexpected keyword or identifier.</problem>
<problem file="src/lib/rewards-data.ts" line="143" column="47" code="1003">Identifier expected.</problem>
<problem file="src/lib/rewards-data.ts" line="143" column="48" code="1161">Unterminated regular expression literal.</problem>
<problem file="src/lib/rewards-data.ts" line="144" column="19" code="1005">';' expected.</problem>
<problem file="src/lib/rewards-data.ts" line="144" column="37" code="1005">';' expected.</problem>
<problem file="src/lib/rewards-data.ts" line="144" column="47" code="1005">';' expected.</problem>
<problem file="src/lib/rewards-data.ts" line="144" column="67" code="1005">';' expected.</problem>
<problem file="src/lib/rewards-data.ts" line="145" column="21" code="1005">';' expected.</problem>
<problem file="src/lib/rewards-data.ts" line="146" column="12" code="1161">Unterminated regular expression literal.</problem>
<problem file="src/lib/rewards-data.ts" line="147" column="10" code="1161">Unterminated regular expression literal.</problem>
<problem file="src/lib/rewards-data.ts" line="148" column="7" code="1128">Declaration or statement expected.</problem>
<problem file="src/lib/rewards-data.ts" line="148" column="9" code="1128">Declaration or statement expected.</problem>
<problem file="src/lib/rewards-data.ts" line="149" column="21" code="1005">'>' expected.</problem>
<problem file="src/lib/rewards-data.ts" line="149" column="30" code="1005">')' expected.</problem>
<problem file="src/lib/rewards-data.ts" line="151" column="10" code="1161">Unterminated regular expression literal.</problem>
<problem file="src/lib/rewards-data.ts" line="152" column="7" code="1128">Declaration or statement expected.</problem>
<problem file="src/lib/rewards-data.ts" line="152" column="8" code="1128">Declaration or statement expected.</problem>
<problem file="src/lib/rewards-data.ts" line="155" column="17" code="1005">'>' expected.</problem>
<problem file="src/lib/rewards-data.ts" line="155" column="24" code="1005">')' expected.</problem>
<problem file="src/lib/rewards-data.ts" line="155" column="33" code="1005">';' expected.</problem>
<problem file="src/lib/rewards-data.ts" line="155" column="43" code="1005">';' expected.</problem>
<problem file="src/lib/rewards-data.ts" line="155" column="63" code="1005">';' expected.</problem>
<problem file="src/lib/rewards-data.ts" line="156" column="22" code="1005">'>' expected.</problem>
<problem file="src/lib/rewards-data.ts" line="156" column="31" code="1005">';' expected.</problem>
<problem file="src/lib/rewards-data.ts" line="156" column="48" code="1109">Expression expected.</problem>
<problem file="src/lib/rewards-data.ts" line="156" column="55" code="1005">';' expected.</problem>
<problem file="src/lib/rewards-data.ts" line="157" column="10" code="1161">Unterminated regular expression literal.</problem>
<problem file="src/lib/rewards-data.ts" line="158" column="7" code="1128">Declaration or statement expected.</problem>
<problem file="src/lib/rewards-data.ts" line="159" column="6" code="1110">Type expected.</problem>
<problem file="src/lib/rewards-data.ts" line="160" column="3" code="1128">Declaration or statement expected.</problem>
<problem file="src/lib/rewards-data.ts" line="161" column="1" code="1128">Declaration or statement expected.</problem>
<problem file="src/lib/rewards-data.ts" line="91" column="2" code="2304">Cannot find name 'dyad'.</problem>
<problem file="src/lib/rewards-data.ts" line="91" column="7" code="2304">Cannot find name 'write'.</problem>
<problem file="src/lib/rewards-data.ts" line="91" column="13" code="2304">Cannot find name 'path'.</problem>
<problem file="src/lib/rewards-data.ts" line="91" column="53" code="2304">Cannot find name 'description'.</problem>
<problem file="src/lib/rewards-data.ts" line="130" column="6" code="2304">Cannot find name 'div'.</problem>
<problem file="src/lib/rewards-data.ts" line="130" column="10" code="2304">Cannot find name 'className'.</problem>
<problem file="src/lib/rewards-data.ts" line="131" column="8" code="2304">Cannot find name 'div'.</problem>
<problem file="src/lib/rewards-data.ts" line="131" column="12" code="2304">Cannot find name 'className'.</problem>
<problem file="src/lib/rewards-data.ts" line="132" column="10" code="2749">'Smile' refers to a value, but is being used as a type here. Did you mean 'typeof Smile'?</problem>
<problem file="src/lib/rewards-data.ts" line="132" column="16" code="2304">Cannot find name 'className'.</problem>
<problem file="src/lib/rewards-data.ts" line="132" column="26" code="2362">The left-hand side of an arithmetic operation must be of type 'any', 'number', 'bigint' or an enum type.</problem>
<problem file="src/lib/rewards-data.ts" line="133" column="10" code="2304">Cannot find name 'span'.</problem>
<problem file="src/lib/rewards-data.ts" line="133" column="18" code="2304">Cannot find name 'Steher'.</problem>
<problem file="src/lib/rewards-data.ts" line="133" column="25" code="2304">Cannot find name 'Meister'.</problem>
<problem file="src/lib/rewards-data.ts" line="133" column="33" code="2304">Cannot find name 'Bonus'.</problem>
<problem file="src/lib/rewards-data.ts" line="133" column="40" code="2304">Cannot find name 'Dad'.</problem>
<problem file="src/lib/rewards-data.ts" line="133" column="44" code="2304">Cannot find name 'Joke'.</problem>
<problem file="src/lib/rewards-data.ts" line="133" column="44" code="2365">Operator '<' cannot be applied to types 'boolean' and 'RegExp'.</problem>
<problem file="src/lib/rewards-data.ts" line="137" column="10" code="2304">Cannot find name 'div'.</problem>
<problem file="src/lib/rewards-data.ts" line="137" column="14" code="2304">Cannot find name 'className'.</problem>
<problem file="src/lib/rewards-data.ts" line="138" column="12" code="2749">'Loader2' refers to a value, but is being used as a type here. Did you mean 'typeof Loader2'?</problem>
<problem file="src/lib/rewards-data.ts" line="138" column="20" code="2304">Cannot find name 'className'.</problem>
<problem file="src/lib/rewards-data.ts" line="138" column="30" code="2362">The left-hand side of an arithmetic operation must be of type 'any', 'number', 'bigint' or an enum type.</problem>
<problem file="src/lib/rewards-data.ts" line="139" column="12" code="2304">Cannot find name 'span'.</problem>
<problem file="src/lib/rewards-data.ts" line="139" column="17" code="2304">Cannot find name 'Witz'.</problem>
<problem file="src/lib/rewards-data.ts" line="139" column="22" code="2304">Cannot find name 'wird'.</problem>
<problem file="src/lib/rewards-data.ts" line="139" column="27" code="2304">Cannot find name 'geladen'.</problem>
<problem file="src/lib/rewards-data.ts" line="141" column="11" code="2552">Cannot find name 'error'. Did you mean 'Error'?</problem>
<problem file="src/lib/rewards-data.ts" line="142" column="10" code="2304">Cannot find name 'div'.</problem>
<problem file="src/lib/rewards-data.ts" line="142" column="14" code="2304">Cannot find name 'className'.</problem>
<problem file="src/lib/rewards-data.ts" line="143" column="12" code="2304">Cannot find name 'p'.</problem>
<problem file="src/lib/rewards-data.ts" line="143" column="14" code="2304">Cannot find name 'Witz'.</problem>
<problem file="src/lib/rewards-data.ts" line="143" column="19" code="2304">Cannot find name 'konnte'.</problem>
<problem file="src/lib/rewards-data.ts" line="143" column="26" code="2304">Cannot find name 'nicht'.</problem>
<problem file="src/lib/rewards-data.ts" line="143" column="32" code="2304">Cannot find name 'geladen'.</problem>
<problem file="src/lib/rewards-data.ts" line="143" column="40" code="2304">Cannot find name 'werden'.</problem>
<problem file="src/lib/rewards-data.ts" line="143" column="40" code="2365">Operator '<' cannot be applied to types 'boolean' and 'ForwardRefExoticComponent<ButtonProps & RefAttributes<HTMLButtonElement>>'.</problem>
<problem file="src/lib/rewards-data.ts" line="144" column="19" code="2304">Cannot find name 'variant'.</problem>
<problem file="src/lib/rewards-data.ts" line="144" column="37" code="2304">Cannot find name 'size'.</problem>
<problem file="src/lib/rewards-data.ts" line="144" column="47" code="2304">Cannot find name 'onClick'.</problem>
<problem file="src/lib/rewards-data.ts" line="144" column="56" code="18004">No value exists in scope for the shorthand property 'fetchJoke'. Either declare one or provide an initializer.</problem>
<problem file="src/lib/rewards-data.ts" line="144" column="67" code="2304">Cannot find name 'className'.</problem>
<problem file="src/lib/rewards-data.ts" line="145" column="13" code="2304">Cannot find name 'Nochmal'.</problem>
<problem file="src/lib/rewards-data.ts" line="145" column="21" code="2304">Cannot find name 'versuchen'.</problem>
<problem file="src/lib/rewards-data.ts" line="145" column="21" code="2365">Operator '<' cannot be applied to types 'boolean' and 'RegExp'.</problem>
<problem file="src/lib/rewards-data.ts" line="149" column="10" code="2304">Cannot find name 'blockquote'.</problem>
<problem file="src/lib/rewards-data.ts" line="149" column="21" code="2304">Cannot find name 'className'.</problem>
<problem file="src/lib/rewards-data.ts" line="149" column="31" code="2365">Operator '<' cannot be applied to types 'boolean' and 'RegExp'.</problem>
<problem file="src/lib/rewards-data.ts" line="154" column="9" code="2304">Cannot find name 'loading'.</problem>
<problem file="src/lib/rewards-data.ts" line="154" column="21" code="2304">Cannot find name 'error'.</problem>
<problem file="src/lib/rewards-data.ts" line="155" column="10" code="2749">'Button' refers to a value, but is being used as a type here. Did you mean 'typeof Button'?</problem>
<problem file="src/lib/rewards-data.ts" line="155" column="17" code="2304">Cannot find name 'variant'.</problem>
<problem file="src/lib/rewards-data.ts" line="155" column="33" code="2304">Cannot find name 'size'.</problem>
<problem file="src/lib/rewards-data.ts" line="155" column="43" code="2304">Cannot find name 'onClick'.</problem>
<problem file="src/lib/rewards-data.ts" line="155" column="52" code="18004">No value exists in scope for the shorthand property 'fetchJoke'. Either declare one or provide an initializer.</problem>
<problem file="src/lib/rewards-data.ts" line="155" column="63" code="2304">Cannot find name 'className'.</problem>
<problem file="src/lib/rewards-data.ts" line="156" column="12" code="2749">'RefreshCw' refers to a value, but is being used as a type here. Did you mean 'typeof RefreshCw'?</problem>
<problem file="src/lib/rewards-data.ts" line="156" column="22" code="2304">Cannot find name 'className'.</problem>
<problem file="src/lib/rewards-data.ts" line="156" column="32" code="2362">The left-hand side of an arithmetic operation must be of type 'any', 'number', 'bigint' or an enum type.</problem>
<problem file="src/lib/rewards-data.ts" line="156" column="50" code="2304">Cannot find name 'Noch'.</problem>
<problem file="src/lib/rewards-data.ts" line="156" column="55" code="2304">Cannot find name 'ein'.</problem>
<problem file="src/lib/rewards-data.ts" line="156" column="59" code="2304">Cannot find name 'Flachwitz'.</problem>
<problem file="src/pages/Index.tsx" line="9" column="10" code="2614">Module '"@/lib/rewards-data"' has no exported member 'getRandomReward'. Did you mean to use 'import getRandomReward from "@/lib/rewards-data"' instead?</problem>
<problem file="src/components/DadJokeWidget.tsx" line="42" column="32" code="2339">Property 'dyad-write' does not exist on type 'JSX.IntrinsicElements'.</problem>
<problem file="src/components/DadJokeWidget.tsx" line="45" column="17" code="2695">Left side of comma operator is unused and has no side effects.</problem>
<problem file="src/components/DadJokeWidget.tsx" line="46" column="10" code="2695">Left side of comma operator is unused and has no side effects.</problem>
<problem file="src/components/DadJokeWidget.tsx" line="46" column="10" code="2695">Left side of comma operator is unused and has no side effects.</problem>
<problem file="src/components/DadJokeWidget.tsx" line="50" column="35" code="2339">Property 'string' does not exist on type 'JSX.IntrinsicElements'.</problem>
<problem file="src/components/DadJokeWidget.tsx" line="51" column="41" code="2339">Property 'boolean' does not exist on type 'JSX.IntrinsicElements'.</problem>
<problem file="src/components/DadJokeWidget.tsx" line="52" column="37" code="2339">Property 'boolean' does not exist on type 'JSX.IntrinsicElements'.</problem>
<problem file="src/components/DadJokeWidget.tsx" line="59" column="9" code="2304">Cannot find name 'headers'.</problem>
<problem file="src/components/DadJokeWidget.tsx" line="60" column="11" code="2304">Cannot find name 'Accept'.</problem>
</dyad-problem-report><think>**Refactoring Component Logic**

I'm focusing on cleaning up the interrupted work, especially within `DadJokeWidget.tsx` and `rewards-data.ts`. The goal is a more structured and robust approach. Following that, I'll integrate `RewardDisplay.tsx` to visualize the rewards properly.


</think><dyad-problem-report summary="164 problems">
<problem file="src/components/DadJokeWidget.tsx" line="39" column="6" code="17008">JSX element 'div' has no corresponding closing tag.</problem>
<problem file="src/components/DadJokeWidget.tsx" line="40" column="8" code="17008">JSX element 'div' has no corresponding closing tag.</problem>
<problem file="src/components/DadJokeWidget.tsx" line="42" column="10" code="17008">JSX element 'span' has no corresponding closing tag.</problem>
<problem file="src/components/DadJokeWidget.tsx" line="42" column="33" code="17008">JSX element 'dyad-write' has no corresponding closing tag.</problem>
<problem file="src/components/DadJokeWidget.tsx" line="49" column="37" code="1382">Unexpected token. Did you mean `{'>'}` or `&gt;`?</problem>
<problem file="src/components/DadJokeWidget.tsx" line="50" column="3" code="1109">Expression expected.</problem>
<problem file="src/components/DadJokeWidget.tsx" line="50" column="36" code="17008">JSX element 'string' has no corresponding closing tag.</problem>
<problem file="src/components/DadJokeWidget.tsx" line="51" column="42" code="17008">JSX element 'boolean' has no corresponding closing tag.</problem>
<problem file="src/components/DadJokeWidget.tsx" line="52" column="38" code="17008">JSX element 'boolean' has no corresponding closing tag.</problem>
<problem file="src/components/DadJokeWidget.tsx" line="54" column="31" code="1382">Unexpected token. Did you mean `{'>'}` or `&gt;`?</problem>
<problem file="src/components/DadJokeWidget.tsx" line="55" column="21" code="1005">'}' expected.</problem>
<problem file="src/components/DadJokeWidget.tsx" line="58" column="7" code="1109">Expression expected.</problem>
<problem file="src/components/DadJokeWidget.tsx" line="59" column="16" code="1005">'}' expected.</problem>
<problem file="src/components/DadJokeWidget.tsx" line="60" column="17" code="1005">'}' expected.</problem>
<problem file="src/components/DadJokeWidget.tsx" line="62" column="9" code="1381">Unexpected token. Did you mean `{'}'}` or `&rbrace;`?</problem>
<problem file="src/components/DadJokeWidget.tsx" line="63" column="7" code="1381">Unexpected token. Did you mean `{'}'}` or `&rbrace;`?</problem>
<problem file="src/components/DadJokeWidget.tsx" line="65" column="9" code="1109">Expression expected.</problem>
<problem file="src/components/DadJokeWidget.tsx" line="66" column="7" code="1381">Unexpected token. Did you mean `{'}'}` or `&rbrace;`?</problem>
<problem file="src/components/DadJokeWidget.tsx" line="69" column="5" code="1381">Unexpected token. Did you mean `{'}'}` or `&rbrace;`?</problem>
<problem file="src/components/DadJokeWidget.tsx" line="70" column="21" code="1005">'}' expected.</problem>
<problem file="src/components/DadJokeWidget.tsx" line="71" column="5" code="1381">Unexpected token. Did you mean `{'}'}` or `&rbrace;`?</problem>
<problem file="src/components/DadJokeWidget.tsx" line="72" column="24" code="1005">'}' expected.</problem>
<problem file="src/components/DadJokeWidget.tsx" line="73" column="5" code="1381">Unexpected token. Did you mean `{'}'}` or `&rbrace;`?</problem>
<problem file="src/components/DadJokeWidget.tsx" line="74" column="3" code="1381">Unexpected token. Did you mean `{'}'}` or `&rbrace;`?</problem>
<problem file="src/components/DadJokeWidget.tsx" line="76" column="17" code="1382">Unexpected token. Did you mean `{'>'}` or `&gt;`?</problem>
<problem file="src/components/DadJokeWidget.tsx" line="77" column="16" code="1005">'}' expected.</problem>
<problem file="src/components/DadJokeWidget.tsx" line="78" column="3" code="1381">Unexpected token. Did you mean `{'}'}` or `&rbrace;`?</problem>
<problem file="src/components/DadJokeWidget.tsx" line="112" column="1" code="1381">Unexpected token. Did you mean `{'}'}` or `&rbrace;`?</problem>
<problem file="src/components/DadJokeWidget.tsx" line="114" column="30" code="1005">'</' expected.</problem>
<problem file="src/lib/rewards-data.ts" line="91" column="6" code="1005">'>' expected.</problem>
<problem file="src/lib/rewards-data.ts" line="91" column="13" code="1005">',' expected.</problem>
<problem file="src/lib/rewards-data.ts" line="91" column="53" code="1005">',' expected.</problem>
<problem file="src/lib/rewards-data.ts" line="92" column="13" code="1005">',' expected.</problem>
<problem file="src/lib/rewards-data.ts" line="130" column="10" code="1005">'>' expected.</problem>
<problem file="src/lib/rewards-data.ts" line="130" column="19" code="1005">')' expected.</problem>
<problem file="src/lib/rewards-data.ts" line="131" column="12" code="1005">'>' expected.</problem>
<problem file="src/lib/rewards-data.ts" line="131" column="21" code="1005">';' expected.</problem>
<problem file="src/lib/rewards-data.ts" line="132" column="16" code="1005">'>' expected.</problem>
<problem file="src/lib/rewards-data.ts" line="132" column="25" code="1005">';' expected.</problem>
<problem file="src/lib/rewards-data.ts" line="132" column="37" code="1109">Expression expected.</problem>
<problem file="src/lib/rewards-data.ts" line="133" column="18" code="1005">';' expected.</problem>
<problem file="src/lib/rewards-data.ts" line="133" column="38" code="1005">';' expected.</problem>
<problem file="src/lib/rewards-data.ts" line="133" column="40" code="1434">Unexpected keyword or identifier.</problem>
<problem file="src/lib/rewards-data.ts" line="133" column="50" code="1161">Unterminated regular expression literal.</problem>
<problem file="src/lib/rewards-data.ts" line="134" column="8" code="1161">Unterminated regular expression literal.</problem>
<problem file="src/lib/rewards-data.ts" line="137" column="14" code="1005">'>' expected.</problem>
<problem file="src/lib/rewards-data.ts" line="137" column="23" code="1005">')' expected.</problem>
<problem file="src/lib/rewards-data.ts" line="138" column="20" code="1005">'>' expected.</problem>
<problem file="src/lib/rewards-data.ts" line="138" column="29" code="1005">':' expected.</problem>
<problem file="src/lib/rewards-data.ts" line="138" column="54" code="1109">Expression expected.</problem>
<problem file="src/lib/rewards-data.ts" line="139" column="22" code="1005">';' expected.</problem>
<problem file="src/lib/rewards-data.ts" line="139" column="27" code="1434">Unexpected keyword or identifier.</problem>
<problem file="src/lib/rewards-data.ts" line="139" column="34" code="1128">Declaration or statement expected.</problem>
<problem file="src/lib/rewards-data.ts" line="139" column="38" code="1110">Type expected.</problem>
<problem file="src/lib/rewards-data.ts" line="140" column="10" code="1161">Unterminated regular expression literal.</problem>
<problem file="src/lib/rewards-data.ts" line="141" column="7" code="1128">Declaration or statement expected.</problem>
<problem file="src/lib/rewards-data.ts" line="141" column="9" code="1128">Declaration or statement expected.</problem>
<problem file="src/lib/rewards-data.ts" line="142" column="14" code="1005">'>' expected.</problem>
<problem file="src/lib/rewards-data.ts" line="142" column="23" code="1005">')' expected.</problem>
<problem file="src/lib/rewards-data.ts" line="143" column="19" code="1005">':' expected.</problem>
<problem file="src/lib/rewards-data.ts" line="143" column="26" code="1434">Unexpected keyword or identifier.</problem>
<problem file="src/lib/rewards-data.ts" line="143" column="32" code="1434">Unexpected keyword or identifier.</problem>
<problem file="src/lib/rewards-data.ts" line="143" column="47" code="1003">Identifier expected.</problem>
<problem file="src/lib/rewards-data.ts" line="143" column="48" code="1161">Unterminated regular expression literal.</problem>
<problem file="src/lib/rewards-data.ts" line="144" column="19" code="1005">';' expected.</problem>
<problem file="src/lib/rewards-data.ts" line="144" column="37" code="1005">';' expected.</problem>
<problem file="src/lib/rewards-data.ts" line="144" column="47" code="1005">';' expected.</problem>
<problem file="src/lib/rewards-data.ts" line="144" column="67" code="1005">';' expected.</problem>
<problem file="src/lib/rewards-data.ts" line="145" column="21" code="1005">';' expected.</problem>
<problem file="src/lib/rewards-data.ts" line="146" column="12" code="1161">Unterminated regular expression literal.</problem>
<problem file="src/lib/rewards-data.ts" line="147" column="10" code="1161">Unterminated regular expression literal.</problem>
<problem file="src/lib/rewards-data.ts" line="148" column="7" code="1128">Declaration or statement expected.</problem>
<problem file="src/lib/rewards-data.ts" line="148" column="9" code="1128">Declaration or statement expected.</problem>
<problem file="src/lib/rewards-data.ts" line="149" column="21" code="1005">'>' expected.</problem>
<problem file="src/lib/rewards-data.ts" line="149" column="30" code="1005">')' expected.</problem>
<problem file="src/lib/rewards-data.ts" line="151" column="10" code="1161">Unterminated regular expression literal.</problem>
<problem file="src/lib/rewards-data.ts" line="152" column="7" code="1128">Declaration or statement expected.</problem>
<problem file="src/lib/rewards-data.ts" line="152" column="8" code="1128">Declaration or statement expected.</problem>
<problem file="src/lib/rewards-data.ts" line="155" column="17" code="1005">'>' expected.</problem>
<problem file="src/lib/rewards-data.ts" line="155" column="24" code="1005">')' expected.</problem>
<problem file="src/lib/rewards-data.ts" line="155" column="33" code="1005">';' expected.</problem>
<problem file="src/lib/rewards-data.ts" line="155" column="43" code="1005">';' expected.</problem>
<problem file="src/lib/rewards-data.ts" line="155" column="63" code="1005">';' expected.</problem>
<problem file="src/lib/rewards-data.ts" line="156" column="22" code="1005">'>' expected.</problem>
<problem file="src/lib/rewards-data.ts" line="156" column="31" code="1005">';' expected.</problem>
<problem file="src/lib/rewards-data.ts" line="156" column="48" code="1109">Expression expected.</problem>
<problem file="src/lib/rewards-data.ts" line="156" column="55" code="1005">';' expected.</problem>
<problem file="src/lib/rewards-data.ts" line="157" column="10" code="1161">Unterminated regular expression literal.</problem>
<problem file="src/lib/rewards-data.ts" line="158" column="7" code="1128">Declaration or statement expected.</problem>
<problem file="src/lib/rewards-data.ts" line="159" column="6" code="1110">Type expected.</problem>
<problem file="src/lib/rewards-data.ts" line="160" column="3" code="1128">Declaration or statement expected.</problem>
<problem file="src/lib/rewards-data.ts" line="161" column="1" code="1128">Declaration or statement expected.</problem>
<problem file="src/lib/rewards-data.ts" line="91" column="2" code="2304">Cannot find name 'dyad'.</problem>
<problem file="src/lib/rewards-data.ts" line="91" column="7" code="2304">Cannot find name 'write'.</problem>
<problem file="src/lib/rewards-data.ts" line="91" column="13" code="2304">Cannot find name 'path'.</problem>
<problem file="src/lib/rewards-data.ts" line="91" column="53" code="2304">Cannot find name 'description'.</problem>
<problem file="src/lib/rewards-data.ts" line="130" column="6" code="2304">Cannot find name 'div'.</problem>
<problem file="src/lib/rewards-data.ts" line="130" column="10" code="2304">Cannot find name 'className'.</problem>
<problem file="src/lib/rewards-data.ts" line="131" column="8" code="2304">Cannot find name 'div'.</problem>
<problem file="src/lib/rewards-data.ts" line="131" column="12" code="2304">Cannot find name 'className'.</problem>
<problem file="src/lib/rewards-data.ts" line="132" column="10" code="2749">'Smile' refers to a value, but is being used as a type here. Did you mean 'typeof Smile'?</problem>
<problem file="src/lib/rewards-data.ts" line="132" column="16" code="2304">Cannot find name 'className'.</problem>
<problem file="src/lib/rewards-data.ts" line="132" column="26" code="2362">The left-hand side of an arithmetic operation must be of type 'any', 'number', 'bigint' or an enum type.</problem>
<problem file="src/lib/rewards-data.ts" line="133" column="10" code="2304">Cannot find name 'span'.</problem>
<problem file="src/lib/rewards-data.ts" line="133" column="18" code="2304">Cannot find name 'Steher'.</problem>
<problem file="src/lib/rewards-data.ts" line="133" column="25" code="2304">Cannot find name 'Meister'.</problem>
<problem file="src/lib/rewards-data.ts" line="133" column="33" code="2304">Cannot find name 'Bonus'.</problem>
<problem file="src/lib/rewards-data.ts" line="133" column="40" code="2304">Cannot find name 'Dad'.</problem>
<problem file="src/lib/rewards-data.ts" line="133" column="44" code="2304">Cannot find name 'Joke'.</problem>
<problem file="src/lib/rewards-data.ts" line="133" column="44" code="2365">Operator '<' cannot be applied to types 'boolean' and 'RegExp'.</problem>
<problem file="src/lib/rewards-data.ts" line="137" column="10" code="2304">Cannot find name 'div'.</problem>
<problem file="src/lib/rewards-data.ts" line="137" column="14" code="2304">Cannot find name 'className'.</problem>
<problem file="src/lib/rewards-data.ts" line="138" column="12" code="2749">'Loader2' refers to a value, but is being used as a type here. Did you mean 'typeof Loader2'?</problem>
<problem file="src/lib/rewards-data.ts" line="138" column="20" code="2304">Cannot find name 'className'.</problem>
<problem file="src/lib/rewards-data.ts" line="138" column="30" code="2362">The left-hand side of an arithmetic operation must be of type 'any', 'number', 'bigint' or an enum type.</problem>
<problem file="src/lib/rewards-data.ts" line="139" column="12" code="2304">Cannot find name 'span'.</problem>
<problem file="src/lib/rewards-data.ts" line="139" column="17" code="2304">Cannot find name 'Witz'.</problem>
<problem file="src/lib/rewards-data.ts" line="139" column="22" code="2304">Cannot find name 'wird'.</problem>
<problem file="src/lib/rewards-data.ts" line="139" column="27" code="2304">Cannot find name 'geladen'.</problem>
<problem file="src/lib/rewards-data.ts" line="141" column="11" code="2552">Cannot find name 'error'. Did you mean 'Error'?</problem>
<problem file="src/lib/rewards-data.ts" line="142" column="10" code="2304">Cannot find name 'div'.</problem>
<problem file="src/lib/rewards-data.ts" line="142" column="14" code="2304">Cannot find name 'className'.</problem>
<problem file="src/lib/rewards-data.ts" line="143" column="12" code="2304">Cannot find name 'p'.</problem>
<problem file="src/lib/rewards-data.ts" line="143" column="14" code="2304">Cannot find name 'Witz'.</problem>
<problem file="src/lib/rewards-data.ts" line="143" column="19" code="2304">Cannot find name 'konnte'.</problem>
<problem file="src/lib/rewards-data.ts" line="143" column="26" code="2304">Cannot find name 'nicht'.</problem>
<problem file="src/lib/rewards-data.ts" line="143" column="32" code="2304">Cannot find name 'geladen'.</problem>
<problem file="src/lib/rewards-data.ts" line="143" column="40" code="2304">Cannot find name 'werden'.</problem>
<problem file="src/lib/rewards-data.ts" line="143" column="40" code="2365">Operator '<' cannot be applied to types 'boolean' and 'ForwardRefExoticComponent<ButtonProps & RefAttributes<HTMLButtonElement>>'.</problem>
<problem file="src/lib/rewards-data.ts" line="144" column="19" code="2304">Cannot find name 'variant'.</problem>
<problem file="src/lib/rewards-data.ts" line="144" column="37" code="2304">Cannot find name 'size'.</problem>
<problem file="src/lib/rewards-data.ts" line="144" column="47" code="2304">Cannot find name 'onClick'.</problem>
<problem file="src/lib/rewards-data.ts" line="144" column="56" code="18004">No value exists in scope for the shorthand property 'fetchJoke'. Either declare one or provide an initializer.</problem>
<problem file="src/lib/rewards-data.ts" line="144" column="67" code="2304">Cannot find name 'className'.</problem>
<problem file="src/lib/rewards-data.ts" line="145" column="13" code="2304">Cannot find name 'Nochmal'.</problem>
<problem file="src/lib/rewards-data.ts" line="145" column="21" code="2304">Cannot find name 'versuchen'.</problem>
<problem file="src/lib/rewards-data.ts" line="145" column="21" code="2365">Operator '<' cannot be applied to types 'boolean' and 'RegExp'.</problem>
<problem file="src/lib/rewards-data.ts" line="149" column="10" code="2304">Cannot find name 'blockquote'.</problem>
<problem file="src/lib/rewards-data.ts" line="149" column="21" code="2304">Cannot find name 'className'.</problem>
<problem file="src/lib/rewards-data.ts" line="149" column="31" code="2365">Operator '<' cannot be applied to types 'boolean' and 'RegExp'.</problem>
<problem file="src/lib/rewards-data.ts" line="154" column="9" code="2304">Cannot find name 'loading'.</problem>
<problem file="src/lib/rewards-data.ts" line="154" column="21" code="2304">Cannot find name 'error'.</problem>
<problem file="src/lib/rewards-data.ts" line="155" column="10" code="2749">'Button' refers to a value, but is being used as a type here. Did you mean 'typeof Button'?</problem>
<problem file="src/lib/rewards-data.ts" line="155" column="17" code="2304">Cannot find name 'variant'.</problem>
<problem file="src/lib/rewards-data.ts" line="155" column="33" code="2304">Cannot find name 'size'.</problem>
<problem file="src/lib/rewards-data.ts" line="155" column="43" code="2304">Cannot find name 'onClick'.</problem>
<problem file="src/lib/rewards-data.ts" line="155" column="52" code="18004">No value exists in scope for the shorthand property 'fetchJoke'. Either declare one or provide an initializer.</problem>
<problem file="src/lib/rewards-data.ts" line="155" column="63" code="2304">Cannot find name 'className'.</problem>
<problem file="src/lib/rewards-data.ts" line="156" column="12" code="2749">'RefreshCw' refers to a value, but is being used as a type here. Did you mean 'typeof RefreshCw'?</problem>
<problem file="src/lib/rewards-data.ts" line="156" column="22" code="2304">Cannot find name 'className'.</problem>
<problem file="src/lib/rewards-data.ts" line="156" column="32" code="2362">The left-hand side of an arithmetic operation must be of type 'any', 'number', 'bigint' or an enum type.</problem>
<problem file="src/lib/rewards-data.ts" line="156" column="50" code="2304">Cannot find name 'Noch'.</problem>
<problem file="src/lib/rewards-data.ts" line="156" column="55" code="2304">Cannot find name 'ein'.</problem>
<problem file="src/lib/rewards-data.ts" line="156" column="59" code="2304">Cannot find name 'Flachwitz'.</problem>
<problem file="src/pages/Index.tsx" line="9" column="10" code="2614">Module '"@/lib/rewards-data"' has no exported member 'getRandomReward'. Did you mean to use 'import getRandomReward from "@/lib/rewards-data"' instead?</problem>
<problem file="src/components/DadJokeWidget.tsx" line="42" column="32" code="2339">Property 'dyad-write' does not exist on type 'JSX.IntrinsicElements'.</problem>
<problem file="src/components/DadJokeWidget.tsx" line="45" column="17" code="2695">Left side of comma operator is unused and has no side effects.</problem>
<problem file="src/components/DadJokeWidget.tsx" line="46" column="10" code="2695">Left side of comma operator is unused and has no side effects.</problem>
<problem file="src/components/DadJokeWidget.tsx" line="46" column="10" code="2695">Left side of comma operator is unused and has no side effects.</problem>
<problem file="src/components/DadJokeWidget.tsx" line="50" column="35" code="2339">Property 'string' does not exist on type 'JSX.IntrinsicElements'.</problem>
<problem file="src/components/DadJokeWidget.tsx" line="51" column="41" code="2339">Property 'boolean' does not exist on type 'JSX.IntrinsicElements'.</problem>
<problem file="src/components/DadJokeWidget.tsx" line="52" column="37" code="2339">Property 'boolean' does not exist on type 'JSX.IntrinsicElements'.</problem>
<problem file="src/components/DadJokeWidget.tsx" line="59" column="9" code="2304">Cannot find name 'headers'.</problem>
<problem file="src/components/DadJokeWidget.tsx" line="60" column="11" code="2304">Cannot find name 'Accept'.</problem>
</dyad-problem-report>I will fix the syntax errors in `DadJokeWidget.tsx` and complete `rewards-data.ts` with all reward configurations, including special rewards for the 5th and 6th sessions and the Dad Joke widget for the 8th session. I will also make sure `RewardDisplay.tsx` properly renders the new Dad Joke widget and that `Timer.tsx` has smooth, non-crashing 45-minute blinking and no dynamic favicon manipulation.

<dyad-write path="src/components/DadJokeWidget.tsx" description="Clean and standalone Dad Joke widget component">
"use client";

import React, { useEffect, useState } from "react";
import { Loader2, RefreshCw, Smile } from "lucide-react";
import { Button } from "@/components/ui/button";

const DadJokeWidget: React.FC = () => {
  const [joke, setJoke] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<boolean>(false);

  const fetchJoke = async () => {
    setLoading(true);
    setError(false);
    try {
      const response = await fetch("https://icanhazdadjoke.com/", {
        headers: {
          Accept: "application/json",
          "User-Agent": "StehAuf-Challenge (https://dyad.sh)",
        },
      });
      if (!response.ok) {
        throw new Error("Failed to fetch dad joke");
      }
      const data = await response.json();
      setJoke(data.joke);
    } catch {
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchJoke();
  }, []);

  return (
    <div className="flex flex-col items-center justify-center p-6 bg-card text-card-foreground rounded-lg border border-border space-y-4 text-center">
      <div className="flex items-center space-x-2 text-primary font-bold text-lg">
        <Smile className="w-6 h-6" />
        <span>8. Steher Meister-Bonus: Dad Joke!</span>
      </div>

      {loading ? (
        <div className="flex items-center space-x-2 py-4 text-muted-foreground">
          <Loader2 className="h-5 w-5 animate-spin" />
          <span>Witz wird geladen...</span>
        </div>
      ) : error ? (
        <div className="py-2 text-destructive">
          <p>Witz konnte nicht geladen werden.</p>
          <Button variant="outline" size="sm" onClick={fetchJoke} className="mt-2">
            Nochmal versuchen
          </Button>
        </div>
      ) : (
        <blockquote className="text-xl font-medium italic text-foreground px-4 py-2 border-l-4 border-primary">
          "{joke}"
        </blockquote>
      )}

      {!loading && !error && (
        <Button variant="ghost" size="sm" onClick={fetchJoke} className="text-muted-foreground hover:text-foreground">
          <RefreshCw className="w-4 h-4 mr-2" /> Noch ein Flachwitz
        </Button>
      )}
    </div>
  );
};

export default DadJokeWidget;