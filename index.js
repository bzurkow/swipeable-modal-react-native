import React, { Component } from 'react';
import { Animated, Dimensions, Modal, PanResponder, StyleSheet, Text, TouchableHighlight, View } from 'react-native';

const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;

class PopUp extends Component {
	constructor(props) {
		super(props)
		this.state = {
			modalOpen: false,
			wasOpen: false
		};

		this.position = new Animated.ValueXY();
		this.rotate = this.position.x.interpolate({
			inputRange: [-width/2, 0, width/2],
			outputRange: ['-10deg', '0deg', '10deg'],
			extrapolate: 'clamp'
		});

		this.rotateAndTranslate = ({
			transform: [{
				rotate: this.rotate,
			},
			...this.position.getTranslateTransform()
			]
		})

		this.openModal = this.openModal.bind(this);
		this.closeModal = this.closeModal.bind(this);
		this.swipeLeft = this.swipeLeft.bind(this);
		this.swipeRight = this.swipeRight.bind(this)
	};

	openModal(){
		this.setState({ modalOpen: true })
	}

	closeModal(){
		this.setState({ modalOpen: false})
	}

	swipeLeft() {
		this.closeModal()
		this.position.setValue({ x: 0, y: 0 })
		if(typeof this.props.onSwipeLeft === 'function'){
			this.props.onSwipeLeft()
		}
	}

	swipeRight() {
		this.closeModal()
		this.position.setValue({ x: 0, y: 0 })
		if(typeof this.props.onSwipeRight === 'function'){
			this.props.onSwipeRight()
		}
	}

	componentWillMount() {
		this.PanResponder = PanResponder.create({
			onStartShouldSetPanResponder: (evt, gestureState) => true,
			onPanResponderMove: (evt, gestureState) => {
				this.position.setValue({x: gestureState.dx, y: gestureState.dy })
			},
			onPanResponderRelease: (evt, gestureState) => {
				if(gestureState.dx > 120){
					Animated.spring(this.position, {
						toValue: {x: width+100, y: gestureState.dy}
					}).start(this.swipeRight)
				} else if(gestureState.dx < 120){
					Animated.spring(this.position, {
						toValue: {x: -width-100, y: gestureState.dy}
					}).start(this.swipeLeft)
				}
				else {
					Animated.spring(this.position, {
						toValue: {x: 0, y: 0},
						friction: 4
					}).start()
				}
			}
		})
	}

	componentDidMount() {
		this.props.modalOpen ? this.setState({ modalOpen: true }) : false
	}

	componentDidUpdate() {
		if(this.props.modalOpen !== this.state.modalOpen && this.props.modalOpen && !this.state.wasOpen) {
			this.setState({modalOpen: this.props.modalOpen, wasOpen: true}) 
		}
	}

	render() {
		const { children, showButton, buttonContainerStyle, buttonTextStyle, buttonText, buttonColor, modalTransparent, animatedViewStyle, modalOpenAnimation } = this.props

		const displayButton = showButton===false ? false : true

		const displayButtonContainerStyle = {
			backgroundColor: buttonColor || '#1BA9DF',
			borderRadius: 10,
			...buttonContainerStyle
		}

		const displayTextStyle = {
			padding: 20,
			color: '#fff',
			...buttonTextStyle
		}

		const displayModalTransparent = modalTransparent===false ? false : true 
		const displayAnimatedViewStyle = {
			backgroundColor: '#fff',
			borderRadius: 10,
			height: height-85,
			width: width-50,
			marginTop: 60,
			marginBottom: 25,
			marginLeft: 25,
			marginRight: 25,
			...animatedViewStyle
		}

		const displayModalAnimation = modalOpenAnimation || 'slide'

		return (
			<View>
			{ displayButton ?
				<TouchableHighlight style={ displayButtonContainerStyle } onPress={ this.openModal }>
					<Text style={ displayTextStyle }>
						{buttonText || 'Click Me!'}
					</Text>
				</TouchableHighlight> : null
			}
			<Modal
				transparent={displayModalTransparent}
				visible={ this.state.modalOpen }
				animationType={ displayModalAnimation }
				>
				<Animated.View
					{...this.PanResponder.panHandlers}
					style={ [ this.rotateAndTranslate, displayAnimatedViewStyle] }>
					{ children }
				</Animated.View>
			</Modal>
			</View>
			)
	}
};


export default PopUp;