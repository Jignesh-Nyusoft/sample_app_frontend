import { StyleSheet } from 'react-native';
import { Colors, Font, fontSize } from '../../theme';
import { verticalScale } from '../../utils/scaling';
const styles = StyleSheet.create({
    rootView: {
        flex: 1,
        backgroundColor: Colors.white
    },
    topImage: {
        height: '60%',
        borderBottomLeftRadius: 24,
        borderBottomRightRadius: 24
    },
    belowView: {
        height: '40%',
        paddingTop: 24,
        alignItems: 'center',
        paddingHorizontal: 24
    },
    title: {
        fontFamily: Font.FontBold,
        fontSize: fontSize.fontSize_huge,
        color: Colors.primaryText
    },
    text: {
        fontFamily: Font.FontMedium,
        fontSize: fontSize.fontSize_regular,
        color: Colors.secondoryText,
        textAlign: 'center',
        marginTop: verticalScale(12)
    },
    skipText: {
        fontFamily: Font.FontMedium,
        fontSize: fontSize.fontSize_extra_medium,
        color: Colors.primary,
        textAlign: 'center',
        marginTop: verticalScale(32)
    }
});
export default styles;