import {
  Text,
  View,
  Pressable,
  SafeAreaView,
  StyleSheet,
  ScrollView,
} from 'react-native';
import { useState, useEffect, useContext } from 'react';
import Context from './Context';
import DrawerButton from '../../components/DrawerButton';
import UserButton from '../../components/UserButton';
import Logo from '../../components/Logo';
import * as Font from 'expo-font';

export default function TermsScreen({ navigation }) {
  const { name, setName } = useContext(Context);

  const [fontsLoaded, setFontsLoaded] = useState(false);

  useEffect(() => {
    const loadFonts = async () => {
      await Font.loadAsync({
        'alegraya-sans': require('../../assets/fonts/AlegreyaSansSC-Regular.ttf'),
        'alegraya-sans-bold': require('../../assets/fonts/AlegreyaSansSC-Bold.ttf'),
      });
      setFontsLoaded(true);
    };

    if (!fontsLoaded) {
      loadFonts();
    }
  }, [fontsLoaded]);

  return (
    <SafeAreaView style={styles.container}>
      <DrawerButton navigation={navigation} />
      <UserButton navigation={navigation} />
      <Logo />
      <View style={styles.cardContainer}>
        <ScrollView contentContainerStyle={styles.scrollContent}>
          <Text style={styles.title}>Terms and Conditions</Text>
          <Text style={styles.text}>Effective Date: 03/02/2025</Text>
          <Text style={styles.text}>
            Thank you for choosing ImGini. By accessing and using this
            application, you agree to comply with the following terms and
            conditions. If you do not agree to any of these terms, please do not
            use the application.
          </Text>
          <Text style={styles.subtitle}>1. Acceptance of Terms</Text>
          <Text style={styles.text}>
            By using our application, you agree to these terms and conditions.
            We reserve the right to modify these terms at any time, and such
            modifications will become effective when published on this page.
          </Text>
          <Text style={styles.subtitle}>2. Use of the Application</Text>
          <Text style={styles.text}>
            The application is intended to allow users to guess hidden images
            from various topics. You agree to use it only for lawful purposes
            and in accordance with applicable laws.
          </Text>
          <Text style={styles.subtitle}>3. User Registration and Account</Text>
          <Text style={styles.text}>
            If the application requires registration, you must provide accurate
            and complete information. You are responsible for maintaining the
            confidentiality of your account and password and for all activities
            that occur under your account.
          </Text>
          <Text style={styles.subtitle}>4. Subscription and Payments</Text>
          <Text style={styles.text}>
            ImGini offers subscriptions for access to premium content. There are
            no refunds, and there are no free trials available. By subscribing,
            you agree to pay the applicable subscription fees.
          </Text>
          <Text style={styles.subtitle}>5. Intellectual Property</Text>
          <Text style={styles.text}>
            All content available in the application, including text, graphics,
            logos, images, and software, is protected by copyright, trademarks,
            and other intellectual property laws.
          </Text>
          <Text style={styles.subtitle}>6. Privacy and Data Collection</Text>
          <Text style={styles.text}>
            We collect your username and password for account purposes. We are
            committed to protecting your privacy and managing your personal data
            in accordance with our Privacy Policy.
          </Text>
          <Text style={styles.subtitle}>7. Limitation of Liability</Text>
          <Text style={styles.text}>
            The application is provided "as is." We do not guarantee that the
            application will be uninterrupted or error-free. We are not liable
            for any direct or indirect damages arising from the use of the
            application.
          </Text>
          <Text style={styles.subtitle}>
            8. Modifications to the Application
          </Text>
          <Text style={styles.text}>
            We reserve the right to modify or discontinue the application or any
            of its features temporarily or permanently without prior notice. Any
            changes will be communicated through patch notes.
          </Text>
          <Text style={styles.subtitle}>9. Account Suspension</Text>
          <Text style={styles.text}>
            ImGini does not allow for account suspension or termination.
            However, users are responsible for their account and the use of the
            application.
          </Text>
          <Text style={styles.subtitle}>10. Governing Law</Text>
          <Text style={styles.text}>
            These terms are governed by the laws of Spain. Any disputes will be
            resolved in the courts located in Valencia, Spain.
          </Text>
          <Text style={styles.subtitle}>11. Contact Information</Text>
          <Text style={styles.text}>
            If you have any questions about these terms and conditions, please
            contact us at: pixplore@gmail.com.
          </Text>
        </ScrollView>
        <Pressable
          style={styles.button}
          onPress={() => navigation.navigate('Register')}>
          <Text style={styles.text}>Go Back</Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  cardContainer: {
    backgroundColor: 'white',
    maxWidth: '85%',
    width: '85%',
    padding: 20,
    paddingBottom: 30,
    borderRadius: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 8,
    justifyContent: 'center',
    alignItems: 'left',
    alignSelf: 'center',
    marginTop: '5%',
    flex: 1,
  },
  scrollContent: {
    paddingBottom: 20,
  },
  title: {
    fontFamily: 'alegraya-sans-bold',
    fontSize: 20,
    letterSpacing: 2,
  },
  subtitle: {
    fontFamily: 'alegraya-sans-bold',
    fontSize: 18,
    letterSpacing: 2,
    alignSelf: 'center',
  },
  button: {
    backgroundColor: '#a0c4ff',
    width: 'auto',
    padding: 10,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 20,
    elevation: 8,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 5,
  },
  text: {
    fontFamily: 'alegraya-sans',
    letterSpacing: 2,
    fontSize: 14,
    margin: 5,
  },
});
