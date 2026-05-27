const COUNTER_BASE = 'https://api.counterapi.dev/v1';
const NAMESPACE = 'chanda666';
const KEY = 'homepage-likes';
const INITIAL_COUNT = 23;

export async function getLikeCount(): Promise<number> {
  const res = await fetch(`${COUNTER_BASE}/${NAMESPACE}/${KEY}/`);
  const data = await res.json();
  if (data.count === 0) {
    const setRes = await fetch(`${COUNTER_BASE}/${NAMESPACE}/${KEY}/set?count=${INITIAL_COUNT}`);
    const setData = await setRes.json();
    return setData.count ?? INITIAL_COUNT;
  }
  return data.count;
}

export async function incrementLike(): Promise<number> {
  const res = await fetch(`${COUNTER_BASE}/${NAMESPACE}/${KEY}/up`);
  const data = await res.json();
  return data.count;
}

export async function decrementLike(): Promise<number> {
  const res = await fetch(`${COUNTER_BASE}/${NAMESPACE}/${KEY}/down`);
  const data = await res.json();
  return Math.max(0, data.count);
}