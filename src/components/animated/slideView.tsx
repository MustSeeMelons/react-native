import React, { useState, useEffect } from "react";
import { Animated, ViewProperties, Dimensions, Easing } from "react-native";
import { SlideViewType } from "../../definitions";

export interface SlideViewProps extends ViewProperties {
    slideType: SlideViewType
}

export const SlideView: React.FC<SlideViewProps> = (props) => {
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
                duration: 500,
            }
        ).start();

        // wont work, as unmounts happens before the animation
        return () => {
            Animated.timing(
                position,
                {
                    easing: Easing.elastic(0.8),
                    toValue: startPosition,
                    duration: 500,
                }
            ).start();
        }
    }, []);

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