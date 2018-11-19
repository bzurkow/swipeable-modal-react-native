# About

This package delivers a lightweight "pop up" modal that can be swiped right or left. Each direction can receive it's own function to do whatever you would like it to!

[Screenshot](./screenshots/ModalOpen.jpeg)
[Screenshot](./screenshots/Right.jpeg)

# Usage

## Install
```
npm install --save swipeable-modal-react-native
```

## Basic Set Up
```
import React, { Component } from 'react';
import { Text, View } from 'react-native';
import PopUp from 'swipeable-modal-react-native';

export default class Something extends Component {
  render() {
	return (
	  <View>
	    <PopUp>
	      {/*
	      	Put whatever you want to display in the modal here!
	      */}
	    </PopUp>
	  </View>
	)
  }
}
```

Under the default settings, a button will be rendered like such:

[Screenshot](./screenshots/DefaultButton.jpeg)

This can be disabled by props.

# Props

1. `showButton`
2. `buttonText`
3. `buttonColor`
4. `buttonContainerStyle`
5. `buttonTextStyle`
6. `modalTransparent`
7. `modalOpen`
8. `animatedViewStyle`
9. `modalOpenAnimation`
10. `onSwipeRight`
11. `onSwipeLeft`

## 1. showButton

* Default: `true`
* Type: boolean
* Use: Determines whether or not a button will render to open the modal

## 2. buttonText
* Default `Click Me!`
* Type: string
* Use: Sets the text to display in the button

## 3. buttonColor
* Default `#1BA9DF`
* Type: string of hexcode or rgb value
* Use: Sets the background color of the button. NOTE: this will be reset if backgroundColor is set in buttonContainerStyle.

## 4. buttonContainerStyle
* Default: `{backgroundColor: '#1BA9DF', borderRadius: 10}`
* Type: object 
* Use: Sets the style properties of the button's `<TouchableHighlight>` container

## 5. buttonTextStyle
* Default: `{padding: 20, color: '#fff'}`
* Type: object
* Use: Sets the style properties of the button's `<Text>` element

## 6. modalTransparent
* Default: `true`
* Type: boolean
* Use: If `true`, displays rendered content behind modal content. If `false`, blocks non-modal content

## 7. modalOpen
* Default: `false`
* Type: boolean
* Use: To trigger the modal's visibility. If you choose not render the button you have the option to initialize the compenent as true or open it as a side effect once. If the button is visible, you can reopen the modal as many times as you please.

## 8. animatedViewStyle
* Default: 
```
	{
		backgroundColor: '#fff',
		borderRadius: 10,
		height: height-85,
		width: width-50,
		marginTop: 60,
		marginBottom: 25,
		marginLeft: 25,
		marginRight: 25,
	}
```
* Type: object
* Use: An animated view is used to display content. This sets that container's style property.

## 9. modalOpenAnimation
* Default: 'slide'
* Type: Enum: `none`, `slide`, `fade`
* Use: Sets the animation type of the modal content when it opens.

## 10. onSwipeLeft
* Default: undefined
* Type: function
* Use: Sets a function to be called when a user swipes left on the modal. You do not need to reset or close the modal on a swipe, that is done automatically.

## 11. onSwipeRight
* Default: undefined
* Type: function
* Use: Sets a function to be called when a user swipes right on the modal. You do not need to reset or close the modal on a swipe, that is done automatically.

