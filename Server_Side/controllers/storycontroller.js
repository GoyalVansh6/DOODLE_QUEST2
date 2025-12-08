// import storyimage from "../services/storyimage.js";
// import storyContent from "../services/storyservice.js";    
// import audioService from "../services/audioservice.js";
import Story from "../models/storymodel.js";
async function generateStory(req, res)
{
// const story=await storyContent(req.query.obj,req.query.lang)
// await audioService(story);
// const story=`The little bird sang a joyful tune
// A sleepy fox dreamt beneath the moon.
// The wind whispered secrets through the trees,
// As fireflies danced on the evening breeze.`
// const img=await storyimage(story);
// res.status(200).json({
//       story: story,
//       imageurl: img,   // matches the key used in frontend
//     });
// return({story:story ,imgurl:img});
// res.status(200).json({story:story ,imgurl:img});


 const childId = req.auth.userId;
const storyId=req.query.Id;
if(storyId)
{
  const story = await Story.findById(storyId);
   return res.status(200).json(story);

}
else
{
  const story = await Story.findOne({ childId })
      .sort({ createdAt: -1 });  // latest
    if (!story) {
      return res.status(404).json({ message: "No stories found" });}

      res.status(200).json(story);
}
}
export default generateStory;