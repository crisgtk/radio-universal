import React, { useEffect, useState } from 'react';
import {
  BroadcastArchive,
  ChurchActivity,
  ForumComment,
  mockStorage,
  ProgramSchedule,
  StreamConfig,
  StreamInterruptionLog
} from '@radio-universal/shared';
import { AudioPlayer } from './components/AudioPlayer/AudioPlayer';
import { Footer } from './components/Footer/Footer';
import { ActiveTab, Navbar } from './components/Navbar/Navbar';
import { AdminView } from './views/AdminView/AdminView';
import { ForoView } from './views/ForoView/ForoView';
import { HistorialView } from './views/HistorialView/HistorialView';
import { IglesiaView } from './views/IglesiaView/IglesiaView';
import { RadioView } from './views/RadioView/RadioView';

export const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState<ActiveTab>('radio');

  // Shared state with persistence
  const [streamConfig, setStreamConfig] = useState<StreamConfig>(() => mockStorage.getStreamConfig());
  const [programs, setPrograms] = useState<ProgramSchedule[]>(() => mockStorage.getPrograms());
  const [activities, setActivities] = useState<ChurchActivity[]>(() => mockStorage.getActivities());
  const [forumComments, setForumComments] = useState<ForumComment[]>(() => mockStorage.getForumComments());
  const [archives, setArchives] = useState<BroadcastArchive[]>(() => mockStorage.getArchives());
  const [interruptions, setInterruptions] = useState<StreamInterruptionLog[]>(() => mockStorage.getInterruptions());

  // Handlers for state updates
  const handleUpdateStreamConfig = (newConfig: StreamConfig) => {
    setStreamConfig(newConfig);
    mockStorage.saveStreamConfig(newConfig);
  };

  const handleSavePrograms = (newProgs: ProgramSchedule[]) => {
    setPrograms(newProgs);
    mockStorage.savePrograms(newProgs);
  };

  const handleSaveActivities = (newActs: ChurchActivity[]) => {
    setActivities(newActs);
    mockStorage.saveActivities(newActs);
  };

  const handleAddForumComment = (newComment: ForumComment) => {
    const updated = [newComment, ...forumComments];
    setForumComments(updated);
    mockStorage.saveForumComments(updated);
  };

  const handleSaveComments = (newComments: ForumComment[]) => {
    setForumComments(newComments);
    mockStorage.saveForumComments(newComments);
  };

  const handleSaveInterruptions = (newLogs: StreamInterruptionLog[]) => {
    setInterruptions(newLogs);
    mockStorage.saveInterruptions(newLogs);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <Navbar activeTab={activeTab} setActiveTab={setActiveTab} isLive={streamConfig.isLive} />

      <main style={{ flex: 1 }}>
        {activeTab === 'radio' && (
          <RadioView programs={programs} setActiveTab={setActiveTab} />
        )}

        {activeTab === 'foro' && (
          <ForoView comments={forumComments} onAddComment={handleAddForumComment} />
        )}

        {activeTab === 'iglesia' && (
          <IglesiaView activities={activities} />
        )}

        {activeTab === 'historial' && (
          <HistorialView archives={archives} />
        )}

        {activeTab === 'admin' && (
          <AdminView
            streamConfig={streamConfig}
            onUpdateStreamConfig={handleUpdateStreamConfig}
            programs={programs}
            onSavePrograms={handleSavePrograms}
            activities={activities}
            onSaveActivities={handleSaveActivities}
            comments={forumComments}
            onSaveComments={handleSaveComments}
            interruptions={interruptions}
            onSaveInterruptions={handleSaveInterruptions}
          />
        )}
      </main>

      <Footer />

      <AudioPlayer streamConfig={streamConfig} programs={programs} />
    </div>
  );
};

export default App;
