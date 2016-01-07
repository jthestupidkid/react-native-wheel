var React = require('react-native');

var { NativeModules,requireNativeComponent,PropTypes,View} = React;

var UIManager = NativeModules.UIManager;

var NativeWheelView = requireNativeComponent('RCTWheelView',WheelView);

var WHEELVIEW_REF = 'wheel';

var WheelView = React.createClass({
    propTypes: {
        ...View.propTypes,
        onItemChange: PropTypes.func,
        values: PropTypes.array,
        isLoop: PropTypes.bool,
        selectedIndex: PropTypes.number,
        textSize: PropTypes.number,
    },
    handleOnChange(event){
        if(this.props.onItemChange){
            var eventIndex = event.nativeEvent.index;
            var nextIndex = this.props.onItemChange(eventIndex);
            if (eventIndex !== nextIndex) {
              setTimeout(() => { this.snapTo(nextIndex) },  350);
            }
        }
    },
    previous: function(){
        UIManager.dispatchViewManagerCommand(
            React.findNodeHandle(this.refs.wheel),
            UIManager.RCTWheelView.Commands.previous,
            null,
        );
    },
    next: function(){
        UIManager.dispatchViewManagerCommand(
            React.findNodeHandle(this.refs.wheel),
            UIManager.RCTWheelView.Commands.next,
            null,
        );
    },
    snapTo: function(index){
        UIManager.dispatchViewManagerCommand(
            React.findNodeHandle(this.refs.wheel),
            UIManager.RCTWheelView.Commands.snapTo,
            [index],
        );
    },
    render(){
        return <NativeWheelView {...this.props} onChange={this.handleOnChange} ref={WHEELVIEW_REF}/>;
    }
});

module.exports = WheelView;
