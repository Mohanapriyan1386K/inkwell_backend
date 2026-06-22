import JobRole from "../models/JobRole";

export async function CreateJobrole(req, res) {
    try {
        const role = await JobRole.create(req.body)
        res.status(200).json({
            message: "Sucess Created",
            role
        })
    } catch (err) {
        res.status(400).json({ message: err.message })
    }
}

export async function getJobRole(req, res) {
    const roles = await JobRole.find().sort({ name: 1 });
    res.json(roles);
}

export async function updaterole(req, res) {
    const role = await JobRole.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true }
    );

    res.json(role);
}

export async function delRole(req, res) {
    const role = await JobRole.findByIdAndDelete(req.params.id);
    res.json(role);
}