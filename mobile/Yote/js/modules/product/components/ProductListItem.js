// import react things
import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

// import react-native components
import {
  Dimensions
  , Image
  , ListView
  , Platform
  , StyleSheet
  , Text
  , View
} from 'react-native'; 

// import global components
import Base from '../../../global/components/BaseComponent';
import YTButton from '../../../global/components/YTButton';
import YTTouchable from '../../../global/components/YTTouchable';

// import libraries
import moment from 'moment';

// import styles
import YTStyles from '../../../global/styles/YTStyles';
import YTColors from '../../../global/styles/YTColors';

class ProductListItem extends Base {
  constructor(props){
    super(props);
  }

  render() {
    const { product, onPress } = this.props;

    var cell =
              <View style={YTStyles.cell}>
                <Text style={YTStyles.text}>Product List Item</Text>
              </View>

    if(this.props.onPress) {
      cell =
        <YTTouchable onPress={this.props.onPress}>
          {cell}
        </YTTouchable>
    }
    return cell;
  }
}

ProductListItem.propTypes = {
  product: PropTypes.object
  , onPress: PropTypes.func
}

const mapStoreToProps = (store) => {
  const user = store.user.loggedIn.user;

  return {
    user: user
  }
}

export default connect(mapStoreToProps)(ProductListItem);
