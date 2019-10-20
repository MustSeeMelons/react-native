import React, { useState, useEffect } from "react";
import { Animated, ViewProperties, Dimensions, Easing } from "react-native";
import { SlideViewType, SLIDE_TIME } from "../../definitions";
import { connect } from "react-redux";
import { State } from "../../definitions/storeDefinitions";

export interface ISlideViewProps extends ViewProperties {
    slideType: SlideViewType;
}

interface IPropsFromState {
    isRefreshing: boolean;
}

/**
 * Weather data container. Slides in on mount, slides out on REFRESH action.
 */
const SlideView: React.FC<ISlideViewProps & IPropsFromState> = (props) => {
    const { width, height } = Dimensions.get("screen");
    let startPosition: number;

    switch (props.slideType) {
        case SlideViewType.TOP:
            startPosition = -height;
            break;
        case SlideViewType.LEFT:
            startPosition = -width;
            break;
        case SlideViewType.RIGHT:
            startPosition = width;
            break;
        case SlideViewType.BOTTOM:
            startPosition = height;
            break;
    }
    const [position] = useState(new Animated.Value(startPosition));
    const zero = new Animated.Value(0);

    const { slideType } = props;

    const isHorizontal = () => {
        if (slideType === SlideViewType.RIGHT || slideType === SlideViewType.LEFT) {
            return position;
        }
        return zero
    }

    const isVertical = () => {
        if (slideType === SlideViewType.TOP || slideType === SlideViewType.BOTTOM) {
            return position;
        }
        return zero;
    }

    useEffect(() => {
        Animated.timing(
            position,
            {
                easing: Easing.elastic(0.8),
                toValue: 0,
                duration: SLIDE_TIME,
            }
        ).start();
    }, []);

    useEffect(() => {
        if (props.isRefreshing) {
            Animated.timing(
                position,
                {
                    easing: Easing.elastic(0.8),
                    toValue: startPosition,
                    duration: SLIDE_TIME,
                }
            ).start();
        }
    }, [props.isRefreshing]);

    return (
        <Animated.View
            {...props.style}
            style={{
                transform: [
                    { translateX: isHorizontal() },
                    { translateY: isVertical() }
                ]
            }}>
            {props.children}
        </Animated.View>
    );
}

const mapStateToProps = (state: State) => {
    return {
        isRefreshing: state.globalReducer.isRefreshing
    }
}

const ConnectedSlideView = connect(mapStateToProps)(SlideView);

export { ConnectedSlideView as SlideView }