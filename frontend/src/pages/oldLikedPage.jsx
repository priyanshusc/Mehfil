import { useQuery, useQueryClient } from '@tanstack/react-query';
import { useEffect } from 'react';
import { Clock, Heart, Play } from 'lucide-react';
import api from '../api/api';
import { usePlayer } from '../context/PlayerContext';
import { useAuth } from '../context/AuthContext';
import { usePlaylists } from '../context/PlaylistContext';
import { playlistService } from '../services/playlist.service';
import SongMenu from '../components/SongMenu';
import { toast } from 'sonner';

const LikedSongsPage = () => {

    const queryClient = useQueryClient();
    const { setQueue, playSong, currentSong, isPlaying } = usePlayer();
    const { user } = useAuth();
    const { playlists, refreshPlaylists } = usePlaylists();

    const { data: songs, isLoading } = useQuery({
        queryKey: ['likedSongs'],
        queryFn: async () => {
            const res = await api.get('/user/liked-songs');
            return res.data.data;
        },
    });

    const handleRemoveLike = async (e, songId) => {
        e.stopPropagation();
        try {
            const res = await api.post(`/music/togglelike/${songId}`);
            if (res.status === 200) {
                queryClient.invalidateQueries({ queryKey: ['likedSongs'] });
                queryClient.invalidateQueries({ queryKey: ['allSongs'] });

                toast.success('Song unliked successfully!');
            }
        } catch (err) {
            toast.error('Failed to remove like');
        }
    };

    useEffect(() => {
        if (songs) {
            setQueue(songs);
        }
    }, [songs, setQueue]);

    const handleAddToPlaylist = async (e, playlistId, songId) => {
        e.stopPropagation();
        try {
            const res = await playlistService.addSong(playlistId, songId);
            if (res.success) {
                refreshPlaylists();
            }
        } catch (err) {
            alert(err.response?.data?.message || "Failed to add song");
        }
    };

    if (isLoading) return <div className="p-8 text-white">Loading your library...</div>;

    return (
        <div className="min-h-full bg-black -mt-6 -mx-6">

            {/* ===== Mehfil Collection Header ===== */}
            <div className="px-8 pt-8 pb-6">
                <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-r from-[#111111] via-[#1a1a1a] to-[#111111] p-8">

                    <div className="relative flex flex-col lg:flex-row lg:items-center lg:justify-between gap-8">

                        <div className="flex items-center gap-6">

                            <div className="w-28 h-28 rounded-3xl bg-gradient-to-br from-green-400 via-emerald-500 to-cyan-500 flex items-center justify-center">
                                <Heart
                                    size={48}
                                    fill="white"
                                    className="text-white"
                                />
                            </div>

                            <div>
                                <p className="uppercase tracking-[0.3em] text-green-400 text-xs font-semibold">
                                    Mehfil Collection
                                </p>

                                <h1 className="text-4xl md:text-6xl font-black text-white mt-2">
                                    Liked Songs
                                </h1>

                                <div className="flex items-center gap-3 mt-4">
                                    <img
                                        src={user?.profilePicture}
                                        className="w-8 h-8 rounded-full border border-white/20"
                                        alt="user"
                                    />

                                    <span className="text-white font-medium">
                                        {user?.username}
                                    </span>

                                    <span className="text-white/40">•</span>

                                    <span className="text-white/70 text-sm">
                                        {songs?.length} saved songs
                                    </span>
                                </div>
                            </div>
                        </div>

                        <button
                            onClick={() => songs?.length > 0 && playSong(songs[0])}
                            className="h-14 w-14 rounded-full bg-gradient-to-r from-green-500 to-emerald-400 text-black font-bold flex items-center justify-center gap-3 hover:scale-105 active:scale-95 transition-all"
                        >
                            <Play
                                fill="black"
                                size={20}
                            />
                            
                        </button>
                    </div>
                </div>
            </div>

            {/* ===== Songs Section ===== */}
            <div className="px-8 pb-20">

                <div className="grid grid-cols-[16px_4fr_3fr_120px] gap-4 px-4 py-3 border-b border-white/10 text-gray-400 text-sm uppercase tracking-wider font-medium mb-4">
                    <span>#</span>
                    <span>Title</span>
                    <span className="hidden md:block">Artist</span>
                    <span className="flex justify-end pr-8">
                        <Clock size={16} />
                    </span>
                </div>

                {songs?.length === 0 ? (
                    <div className="py-20 text-center">
                        <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-white/5 mb-4">
                            <Heart size={32} className="text-green-400" />
                        </div>

                        <h3 className="text-xl font-semibold text-white mb-2">
                            No liked songs yet
                        </h3>

                        <p className="text-gray-400">
                            Songs you like will appear here.
                        </p>
                    </div>
                ) : (
                    songs.map((song, index) => (
                        <div
                            key={song._id}
                            onClick={() => playSong(song)}
                            className={`grid grid-cols-[16px_4fr_3fr_120px]
                        gap-4
                        px-4
                        py-3
                        rounded-xl
                        border
                        cursor-pointer
                        items-center
                        relative
                        transition-all
                        group
                        ${currentSong?._id === song._id
                                    ? "bg-green-500/10 border-green-500/20 text-green-400"
                                    : "border-transparent hover:border-white/10 hover:bg-white/5 text-white"
                                }`}
                        >
                            <span className="text-sm text-gray-400">
                                {currentSong?._id === song._id && isPlaying ? (
                                    <div className="w-3 h-3 bg-green-500 animate-pulse rounded-full" />
                                ) : (
                                    index + 1
                                )}
                            </span>

                            <div className="flex items-center gap-4 overflow-hidden">
                                <img
                                    src={song.thumbnail_uri}
                                    className="h-12 w-12 rounded-lg object-cover shrink-0"
                                    alt=""
                                />

                                <div className="flex flex-col truncate">
                                    <span
                                        className={`font-medium truncate ${currentSong?._id === song._id
                                            ? "text-green-400"
                                            : "text-white"
                                            }`}
                                    >
                                        {song.title}
                                    </span>

                                    <span className="text-xs text-gray-500">
                                        From your collection
                                    </span>
                                </div>
                            </div>

                            <span className="text-gray-400 text-sm truncate hidden md:block group-hover:text-white transition">
                                {song.artist?.username}
                            </span>

                            <div className="flex justify-end items-center gap-4 relative">
                                <Heart
                                    size={16}
                                    fill="#22c55e"
                                    className="text-green-500 shrink-0"
                                />

                                <span className="text-gray-400 text-sm w-10 text-right">
                                    3:45
                                </span>

                                <SongMenu
                                    song={song}
                                    playlists={playlists}
                                    onAddToPlaylist={handleAddToPlaylist}
                                    onRemoveLike={handleRemoveLike}
                                    context="liked"
                                />
                            </div>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
};

export default LikedSongsPage;