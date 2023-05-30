import "../Forgotpassword/Forgotpassword.css";

export function Forgotpassword() {
  return (
    <div className="container">
      <h2>Recover your account</h2>
      <form>
        <div className="mb-3">
          <label htmlFor="username" className="form-label">User:</label>
          <input type="text" className="form-control" id="username" placeholder="User" required />
        </div>
        <div className="mb-3">
          <label htmlFor="keyword" className="form-label">Keyword:</label>
          <input type="password" className="form-control" id="keyword" placeholder="Keyword" required />
        </div>
        <div className="mb-3">
          <label htmlFor="newPassword" className="form-label">New password:</label>
          <input type="password" className="form-control" id="newPassword" placeholder="New password" required />
        </div>
        <button type="submit" className="btn btn-primary">Recover password</button>
      </form>
      <div className="mt-3">
        <span className="mx-2">Already have an account? <a href="/">Login</a></span>
      </div>
    </div>
  );
}
