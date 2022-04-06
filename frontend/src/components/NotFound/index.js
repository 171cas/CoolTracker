import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import './NotFound.css'

const NotFound = () => {
    const location = useLocation();
    const imgArr = [
        'https://thefunnybeavercomd030b.zapwp.com/q:i/r:1/wp:1/w:412/u:https://thefunnybeaver.com/wp-content/uploads/2017/08/gym-soundofmusic.jpg',
        'https://origympersonaltrainercourses.co.uk/files/img_cache/2103/450_450__1554909082_gymmeme3.jpg',
        'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSxinHH0eP3xj5mpIA3cujApssRFBhHccvIlA&usqp=CAU',
        'https://i.pinimg.com/736x/2e/f7/dc/2ef7dccf62801ea98b0e796b27179ae9--funny-fitness-memes-humor-fitness.jpg',
        'https://i.pinimg.com/736x/a1/f0/28/a1f02834f284e22db63709401ac12d6e--crunches-squats.jpg',
        'https://www.womensrunning.com/wp-content/uploads/2016/07/7-pause.png',
    ]
    const [count, setCount] = useState(0);


    useEffect(() => {
        setCount(Math.floor(Math.random() * imgArr.length))
    }, []);

    return (
        <>
            <h3 className='nfText'>404: Page Doesn't Exist</h3>
            <h3 className='nfText'>Get a meme instead:</h3>
            <br /><br /><br />
            <div className='notFound'>
                <img className='inside-pic' src={imgArr[count]} alt='' />
            </div>
        </>
    );

}

export default NotFound;
