// Sound FX disabled per user request

class SoundFX {
  public isMuted: boolean = true;

  public playShutter() {}
  public playClick(_pitch = 900) {}
  public playFocusLock() {}
  public playHover() {}
  public toggleMute(): boolean {
    return true;
  }
}

export const soundFx = new SoundFX();
