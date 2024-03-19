import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";

function CollectionPage(){

    const user = useSelector((store) => store.user);
    const collection = useSelector((store) => store.collection);
    //console.log('Collection is: ', collection);
    const dispatch = useDispatch();
    
    useEffect(() => {
        dispatch({type: 'GRAB_COLLECTION', payload: user})
      },[])

    return (
        <div>
            <h2>This is the Collection page</h2>
            {collection.map((game, gameIndex) => {
                return(
                    <div key={gameIndex}>
                        <h4>{game.title}</h4>
                        <img src={game.image}></img>

                    </div>

                )
            })}
        </div>
    );
};

export default CollectionPage;