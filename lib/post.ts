import fs from 'fs';
import matter from 'gray-matter';
import path from 'path';
import { remark } from 'remark';
import html from 'remark-html';


const postsDirectory = path.join(process.cwd(), 'root/posts');

console.log('porcess.cwd()->', process.cwd());
//c:\projects\22222
console.log('postsDirectory->', postsDirectory);
//c:\projects\22222/posts

export function getSortedPostsData() {
  const fileNames = fs.readdirSync(postsDirectory); //async비동기,sync동기
  console.log("fileNames=>", fileNames);

  //fileName ['pre-rendering.md','ssg-ssr.md']

  const allPostsData = fileNames.map(fileName => {
    const id = fileName.replace(/\.md$/, '')

    //id='pre-rendering' id='ssg-ssr'

    const fullPath = path.join(postsDirectory, fileName)
    //c:\projects\22222/posts/pre-rendering.md
    const fileContents = fs.readFileSync(fullPath, 'utf8'); //파일 내용
    const matterResult = matter(fileContents); //객체변환
    console.log("matterResult->", matterResult);
    return {
      id,
      ...(matterResult.data as { date: string, title: string })
    }
  })//allPostData


  return allPostsData.sort((a, b) => {
    if (a.date < b.date) {
      return 1
    } else {
      return -1;
    }
  })


}//getSortedPostsData

export function getAllPostIds() {
  const fileNames = fs.readdirSync(postsDirectory);
  return fileNames.map((fileName) => {
    return {
      params: {
        id: fileName.replace(/.\md$/, '')
        //id='pre-rendering' id='ssg-ssr'
      }
    }
  })
}


export async function getPostData(id: string) {
  const fullPath = path.join(postsDirectory, `${id}.md`);

  const fileContents = fs.readFileSync(fullPath, 'utf8');

  const matterResult = matter(fileContents); // 객체변환

  const processedContent = await remark().use(html).process(matterResult.content) //remark는 markdown을 html로 변환 

  const contentHtml = processedContent.toString();


  return {
    id,
    contentHtml,
    ... (matterResult.data as { date: string, title: string })
  }
}