from datetime import datetime

import httpx

from dateutil import parser


from app.core.config import API_BASE_URL



def parse_time(text):

    try:

        dt=parser.parse(text)

        return dt.isoformat()

    except:

        return None



def get_user_appointments(user_id):

    response=httpx.get(

        f"{API_BASE_URL}/appointments/user/{user_id}"

    )

    return response.json()



def check_conflict(

    start_time,

    end_time,

    appointments

):

    start=datetime.fromisoformat(start_time)

    end=datetime.fromisoformat(end_time)


    for a in appointments:

        a_start=datetime.fromisoformat(

            a["start_time"]

        )

        a_end=datetime.fromisoformat(

            a["end_time"]

        )


        if start < a_end and end > a_start:

            return True


    return False



def suggest_free_slots(

    appointments

):

    suggestions=[]

    suggestions.append(

        "Try later today"

    )

    suggestions.append(

        "Try tomorrow morning"

    )

    return suggestions