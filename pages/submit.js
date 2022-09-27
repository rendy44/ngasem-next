import {Footer, Section, TopNav} from "../components/global";
import {SubmitPenalty} from "../components/form";

const SubmitPage = props => {
    return <>
        <TopNav/>
        <Section id={'submit'} title={'Laporkan Pelanggaran'} isTitleCenter={true}>
            <div className={'frow'}>
                <div className={'col-sm-2-3 col-md-1-2'}>
                    <SubmitPenalty/>
                </div>
            </div>
        </Section>
        <Footer/>
    </>
}

export default SubmitPage