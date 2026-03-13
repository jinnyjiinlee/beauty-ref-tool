import { supabase } from './supabaseClient'
import type { SavedChannel } from '../types'

export async function saveChannel(
  channelId: string,
  channelTitle: string,
): Promise<void> {
  const { error } = await supabase.from('saved_channels').upsert(
    { channel_id: channelId, channel_title: channelTitle },
    { onConflict: 'channel_id' },
  )
  if (error) {
    throw new Error(`채널 저장 중 오류: ${error.message}`)
  }
}

export async function fetchChannels(): Promise<SavedChannel[]> {
  const { data, error } = await supabase
    .from('saved_channels')
    .select('*')
    .order('saved_at', { ascending: false })

  if (error) {
    throw new Error(`채널 목록 조회 중 오류: ${error.message}`)
  }

  return (data ?? []).map((row: Record<string, unknown>) => ({
    id: row.id as string,
    channelId: row.channel_id as string,
    channelTitle: row.channel_title as string,
    savedAt: row.saved_at as string,
  }))
}

export async function deleteChannel(id: string): Promise<void> {
  const { error } = await supabase
    .from('saved_channels')
    .delete()
    .eq('id', id)

  if (error) {
    throw new Error(`채널 삭제 중 오류: ${error.message}`)
  }
}
