import Loading from "./Loading";

function Memo({ word, isMemoPending }) {
    
    const SHOW = {
        PENDING: 'pending',
        EMPTY: 'empty',
        MEMO: 'memo',
    };

    let show;
    if (isMemoPending) {
        show = SHOW.PENDING;
    } else if (!word || !word.trim()) {
        show = SHOW.EMPTY;
    } else {
        show = SHOW.MEMO;
    }

    return (
        <div className="memo">
            {show === SHOW.PENDING && <Loading className="memo__waiting">Loading Memo...</Loading>}
            {show === SHOW.EMPTY && <p className="memo__empty">No stored word yet, set one!</p>}
            {show === SHOW.MEMO && (
                <p className="memo__content">Stored word: 
                    <span className="word"> {word}</span>
                </p>
            )}
        </div>
    )
}

export default Memo;