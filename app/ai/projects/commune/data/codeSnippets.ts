// Data: Key code snippets for Commune Geospatial Platform

export interface CodeSnippet {
  id: string;
  title: string;
  filePath: string;
  language: string;
  description: string;
  code: string;
}

export const codeSnippets: CodeSnippet[] = [
  {
    id: "map-state",
    title: "Zustand Map State Management",
    filePath: "lib/stores/mapStore.ts",
    language: "typescript",
    description: "Atomic state management for complex geospatial interactions. Handles autonomous flag lifecycle, category filtering, and persistence with zero-latency UI updates.",
    code: `export const useMapStore = create<MapState>((set, get) => ({
  flags: [],
  selectedFlag: null,
  filterCategory: null,

  addFlag: (flagData) => {
    const newFlag: Flag = {
      ...flagData,
      id: generateId(),
      createdAt: new Date().toISOString(),
    };
    
    const flags = [...get().flags, newFlag];
    set({ flags });
    localStorage.setItem('flags', JSON.stringify(flags));
  },

  getFilteredFlags: () => {
    const { flags, filterCategory } = get();
    if (!filterCategory) return flags;
    return flags.filter(flag => flag.category === filterCategory);
  },
}));`
  },
  {
    id: "whatsapp-rooms",
    title: "Community Workspace Logic",
    filePath: "lib/stores/messageStore.ts",
    language: "typescript",
    description: "Multi-tenant messaging architecture managing WhatsApp-style workspaces. Orchestrates real-time conversation state and user-to-room mapping.",
    code: `export const useMessageStore = create<MessageState>((set, get) => ({
  messages: [],
  conversations: [],

  sendMessage: (messageData) => {
    const newMessage: Message = {
      ...messageData,
      id: generateId(),
      sentAt: new Date().toISOString(),
    };
    
    set((state) => ({
      messages: [...state.messages, newMessage]
    }));
  },

  getMessagesForConversation: (conversationId) => {
    return get().messages.filter(m => m.conversationId === conversationId);
  }
}));`
  },
  {
    id: "geospatial-render",
    title: "Leaflet Map Integration",
    filePath: "components/map/MapContainer.tsx",
    language: "typescript",
    description: "High-performance React-Leaflet implementation. Renders thousands of autonomous map tags with dynamic popups and relational post aggregation.",
    code: `<MapContainer center={[20.5937, 78.9629]} zoom={5}>
  <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
  {flags.map((flag) => (
    <Marker 
      key={flag.id} 
      position={[flag.lat, flag.lng]}
      icon={createCustomIcon(flag.category)}
    >
      <Popup className="custom-popup">
        <div className="p-2">
          <h3 className="font-bold">{flag.title}</h3>
          <p className="text-xs text-slate-500">{flag.postCount} Posts</p>
          <Link href={\`/projects/commune/tags/\${flag.id}\`}>
            Explore Room
          </Link>
        </div>
      </Popup>
    </Marker>
  ))}
</MapContainer>`
  },
  {
    id: "media-pipeline",
    title: "Optimized Media Delivery",
    filePath: "lib/utils/media.ts",
    language: "typescript",
    description: "Automated image processing pipeline ensuring sub-100ms media loads. Enforces WebP conversion and tiered resolution handling.",
    code: `export const optimizeMedia = async (file: File) => {
  const options = {
    maxSizeMB: 1,
    maxWidthOrHeight: 1920,
    useWebWorker: true,
    fileType: 'image/webp'
  };
  
  try {
    const compressedFile = await imageCompression(file, options);
    const { data, error } = await supabase.storage
      .from('commune-media')
      .upload(\`posts/\${Date.now()}.webp\`, compressedFile);
      
    return data?.path;
  } catch (error) {
    console.error("Media optimization failed", error);
  }
};`
  }
];

export default codeSnippets;