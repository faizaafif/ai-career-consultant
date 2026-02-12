from schemas.consultant_schema import ConsultantRequest


class ConsultantProfile:
    def __init__(self, data: ConsultantRequest):
        self.data = data
