import axios from "axios"

const getPredictedAge= async (name:string)=>{
    const res=await axios.get(`https://api.agify.io/?name=${name}`)
    return res.data
}

const getPredictedGender= async (name:string)=>{
    const res=await axios.get(`https://api.genderize.io/?name=${name}`)
    return res.data
}

const getPredictedContry= async (name:string)=>{
    const res=await axios.get(`https://api.nationalize.io/?name=${name}`)
    return res.data
}


interface PageProp {
    params:{
        name:string
    }
}

export default async function Page({params}:PageProp){
    const ageData=getPredictedAge(params.name);
    const genderData=getPredictedGender(params.name);
    const countryData=getPredictedContry(params.name);

    const [age,gender,country]=await Promise.all([
        ageData,
        genderData,
        countryData
    ]);
    return (
        <div>
            <div>
                <div>Personal Info</div>
                <div>Age:{age?.age}</div>
                <div>Gender:{gender?.gender}</div>
                <div>Country:{country?.country[0].country_id}</div>
            </div>
        </div>
    )
}