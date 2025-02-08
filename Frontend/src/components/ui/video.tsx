interface Props {
  source: string;
  controls: boolean;
  width: number;
  height: number;
  classname?: string;
}

const Video = ({ source, controls, width, height, classname }: Props) => {
  return (
    <video
      playsInline
      autoPlay
      loop
      muted
      controls={controls}
      width={width}
      height={height}
      className={`${classname} object-cover will-change-auto`}
      preload="none"
      style={{ backfaceVisibility: "hidden" }}
    >
      <source src={source.replace(".mp4", ".webm")} type="video/webm" />
      <source src={source} type="video/mp4" />
      Video Not supported
    </video>
  );
};

export default Video;
