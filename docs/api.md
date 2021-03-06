## Functions

<dl>
<dt><a href="#simpleAction">simpleAction()</a> ⇒ <code><a href="#ActionCreator">ActionCreator</a></code></dt>
<dd>An action creator with no payload.</dd>
<dt><a href="#payloadAction">payloadAction()</a> ⇒ <code><a href="#ActionCreator">ActionCreator</a></code></dt>
<dd>An action creator with a typed payload.</dd>
<dt><a href="#handlerAction">handlerAction(handler)</a> ⇒ <code><a href="#ActionCreator">ActionCreator</a></code></dt>
<dd>An action creator with a handler function payload.</dd>
<dt><a href="#actionFactory">actionFactory(actionParts, reducer)</a> ⇒ <code><a href="#ActionFactory">ActionFactory</a></code></dt>
<dd>Fills in the type and reducer parameters on an an object values are
action creators (see: <a href="#simpleAction">simpleAction</a>, <a href="#payloadAction">payloadAction</a>, <a href="#handlerAction">handlerAction</a>.</dd>
<dt><a href="#reductser">reductser(initialState, actionParts, reducer)</a> ⇒ <code><a href="#ReductserCreator">ReductserCreator</a></code></dt>
<dd>Create a reductser, to be supplied as values on an object supplied to a <a href="#reductserFactory">reductserFactory</a>.</dd>
<dt><a href="#reductserFactory">reductserFactory(reducerParts)</a> ⇒ <code><a href="#ReductserFactory">ReductserFactory</a></code></dt>
<dd>Returns the scoped actions and reducers from a map of reductsers.</dd>
</dl>

## Typedefs

<dl>
<dt><a href="#ActionCreator">ActionCreator</a> ⇒ <code>object</code></dt>
<dd>An intermediate type used by <a href="#actionFactory">actionFactory</a></dd>
<dt><a href="#ActionFactory">ActionFactory</a></dt>
<dd>An object whose values create actions.</dd>
<dt><a href="#ReductserCreator">ReductserCreator</a> ⇒</dt>
<dd>An intermediate type used by <a href="#reductserFactory">reductserFactory</a></dd>
<dt><a href="#ReductserFactory">ReductserFactory</a> ⇒ <code>object</code></dt>
<dd>The result of supplying reductsers to a <a href="#reductserFactory">reductserFactory</a></dd>
<dt><a href="#ReductserFactory">ReductserFactory</a> ⇒ <code>object</code></dt>
<dd>The result of supplying reductsers to a <a href="#reductserFactory">reductserFactory</a></dd>
</dl>

<a name="simpleAction"></a>

## simpleAction() ⇒ [<code>ActionCreator</code>](#ActionCreator)
An action creator with no payload.

**Kind**: global function  
<a name="payloadAction"></a>

## payloadAction() ⇒ [<code>ActionCreator</code>](#ActionCreator)
An action creator with a typed payload.

**Kind**: global function  
<a name="handlerAction"></a>

## handlerAction(handler) ⇒ [<code>ActionCreator</code>](#ActionCreator)
An action creator with a handler function payload.

**Kind**: global function  

| Param | Description |
| --- | --- |
| handler | like a reducer, a function taking the previous state and arguments to the action creator to create a new state. |

<a name="actionFactory"></a>

## actionFactory(actionParts, reducer) ⇒ [<code>ActionFactory</code>](#ActionFactory)
Fills in the type and reducer parameters on an an object values are
action creators (see: [simpleAction](#simpleAction), [payloadAction](#payloadAction), [handlerAction](#handlerAction)).

**Kind**: global function  

| Param | Description |
| --- | --- |
| actionParts | an object whose values are action creators |
| reducer | the scope (and value of the &quot;reducer&quot; key) on all of the actions created by these actions |

<a name="reductser"></a>

## reductser(initialState, actionParts, reducer) ⇒ [<code>ReductserCreator</code>](#ReductserCreator)
Create a reductser, to be supplied as values on an object supplied to a [reductserFactory](#reductserFactory).

**Kind**: global function  
**Export**:   

| Param | Description |
| --- | --- |
| initialState | A function producing an initial state. |
| actionParts | An object whose values are action creators, e.g.: [simpleAction](#simpleAction) |
| reducer | A reducer on the previous state and the incoming action. |

<a name="reductserFactory"></a>

## reductserFactory(reducerParts) ⇒ [<code>ReductserFactory</code>](#ReductserFactory)
Returns the scoped actions and reducers from a map of reductsers.

**Kind**: global function  

| Param | Description |
| --- | --- |
| reducerParts | An object whose values were constructed by [reductser](#reductser) |

<a name="ActionCreator"></a>

## ActionCreator ⇒ <code>object</code>
An intermediate type used by [actionFactory](#actionFactory)

**Kind**: global typedef  

| Param | Type |
| --- | --- |
| type | <code>SerializableKey</code> | 
| reducer | <code>SerializableKey</code> | 

<a name="ActionFactory"></a>

## ActionFactory
An object whose values create actions.

**Kind**: global typedef  
<a name="ReductserCreator"></a>

## ReductserCreator ⇒
An intermediate type used by [reductserFactory](#reductserFactory)

**Kind**: global typedef  
**Returns**: Reductser Parts  

| Param | Type |
| --- | --- |
| reducer | <code>SerializableKey</code> | 

<a name="ReductserFactory"></a>

## ReductserFactory ⇒ <code>object</code>
The result of supplying reductsers to a [reductserFactory](#reductserFactory)

**Kind**: global typedef  

| Param | Type |
| --- | --- |
| reducer | <code>SerializableKey</code> | 

**Properties**

| Name | Description |
| --- | --- |
| actions | action constructors |
| reducers | Indicates whether the Power component is present. |

<a name="ReductserFactory"></a>

## ReductserFactory ⇒ <code>object</code>
The result of supplying reductsers to a [reductserFactory](#reductserFactory)

**Kind**: global typedef  

| Param | Type |
| --- | --- |
| reducer | <code>SerializableKey</code> | 

**Properties**

| Name | Description |
| --- | --- |
| actions | action constructors |
| reducers | Indicates whether the Power component is present. |

