import { useEffect } from 'react';
import { useStore } from './store/useStore';
import IntroScreen from './components/intro/IntroScreen';
import QuestionScreen from './components/question/QuestionScreen';
import LoadingScreen from './components/loading/LoadingScreen';
import ResultScreen from './components/result/ResultScreen';
import FriendPredictScreen from './components/extension/FriendPredictScreen';
import CompatibilityScreen from './components/extension/CompatibilityScreen';
import CollectionScreen from './components/extension/CollectionScreen';
import Toast from './components/common/Toast';
import './index.css';

function App() {
  const { currentScreen, setSource } = useStore();

  // URL 파라미터 파싱
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const source = params.get('source') || 'direct';
    const ref = params.get('ref') || '';
    setSource(source, ref);
  }, [setSource]);

  const renderScreen = () => {
    switch (currentScreen) {
      case 'intro':
        return <IntroScreen />;
      case 'question':
        return <QuestionScreen />;
      case 'loading':
        return <LoadingScreen />;
      case 'result':
        return <ResultScreen />;
      case 'friend':
        return <FriendPredictScreen />;
      case 'compatibility':
        return <CompatibilityScreen />;
      case 'collection':
        return <CollectionScreen />;
      default:
        return <IntroScreen />;
    }
  };

  return (
    <>
      {renderScreen()}
      <Toast />
    </>
  );
}

export default App;
